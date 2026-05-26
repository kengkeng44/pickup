import Phaser from 'phaser';
import type { ChapterId } from '../data/storyKitten';
import { useRunStore } from '../store/runStore';
import { StoryMapView } from '../ui/StoryMapView';
import { BottomNav } from '../ui/BottomNav';

/**
 * StoryModeScene — v1.7.3 Duolingo-style learning map.
 *
 * Replaces the v0.8 chapter-grid (8 cards) with a vertical zig-zag map:
 *   - 6 coffee-brown nodes for Ch1's 6 questions
 *   - 2 locked Ch2 placeholders teasing future chapters
 *   - Calico cat sprite sits on the current node, hops smoothly to the
 *     next on chapter completion (via CSS transition)
 *   - Fixed bottom nav bar (dark warm brown) — Map / Free / Scenarios /
 *     Stats / Settings
 *
 * The old chapter card markup + `makeChapterCard` machinery is gone; if
 * we need the 8-card grid back, it's preserved on the
 * `backup/v1.5.1-eight-chapters` git branch.
 */
export class StoryModeScene extends Phaser.Scene {
  private mapView?: StoryMapView;
  private nav?: BottomNav;

  constructor() {
    super({ key: 'StoryModeScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#fef8ed');

    this.mapView = new StoryMapView({
      onPlayChapter: (chapter: ChapterId) => {
        const store = useRunStore.getState();
        store.setMode('story');
        store.setChapter(chapter);
        store.setScenario(null);
        store.setLevel('A2');
        this.cleanup();
        this.scene.start('ChapterIntroScene');
      },
    });

    this.nav = new BottomNav('map', {
      onTab: (tab) => {
        switch (tab) {
          case 'map':
            // already here — no-op (could scroll to current node in future)
            break;
          case 'free': {
            const store = useRunStore.getState();
            store.setMode('free');
            store.setScenario(null);
            store.setChapter(null);
            store.setLevel('A2');
            this.cleanup();
            this.scene.start('PlayScene');
            break;
          }
          case 'scenarios':
            // For v1.7.3 we punt scenarios back to MenuScene (which has
            // the existing scenario picker UI). Eventually this should
            // be its own tab view.
            this.cleanup();
            this.scene.start('MenuScene');
            break;
          case 'stats':
          case 'settings':
            // Not implemented yet — silent for v1.7.3. v1.8+ will fill.
            break;
        }
      },
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanup());
  }

  private cleanup(): void {
    this.mapView?.destroy();
    this.mapView = undefined;
    this.nav?.destroy();
    this.nav = undefined;
  }
}

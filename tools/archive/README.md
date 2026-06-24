# tools/archive — 一次性腳本歸檔

這裡放**已完成任務的一次性腳本**:寫某章故事的 `_write-chN-*.cjs`、某次批次修正
(`fix-r1-*`、`apply-toeic-*`、`translate-*`)、舊題庫備份 (`_backup_*`)、掃描/稽核產出
(`_*_flagged.json`、`qa-report-*.md`)、一次性圖片處理 (`process_*.py`、`generate_*.py`) 等。

**為什麼歸檔**:`tools/` top level 之前混了 ~115 個一次性檔,把真正會重複用的工具淹沒了。
2026-06-24 大掃除,top level 只留常用工具(見 `docs/content/MAINTENANCE.md` §5),其餘搬來這裡。

- 全部仍在 git 版控,要找歷史腳本 / 還原直接從這裡撈。
- 這裡的檔案**不在** build / CI pipeline 上,搬動不影響部署。
- 新的一次性腳本跑完也請丟進這裡,別堆在 top level。

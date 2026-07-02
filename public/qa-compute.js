// v2.0.B.545 — 共用計算 / 渲染 for qa-stats (總覽) + qa-details (細節子頁)。
// 單一 source (fetch lessons-ch*.json + tally + render helpers), 兩頁共用, 不重複、不寫死。
window.QA = (function () {
  var EXAM_FROM = 32;
  // 逐題型秒數 — 鏡像 src/data/lessons.ts estimateLessonSeconds 的 Q_SECONDS (B.522)。
  var Q_SECONDS = { narration: 8, 'listen-tf': 13, 'listen-tf-zh': 13, 'type-translate': 38, 'type-what-you-hear': 38,
    'tap-pairs': 28, 'phrase-pairs': 28, 'listen-pairs': 28, 'tap-tiles': 26, 'drag-blank': 26, 'listen-build': 28,
    comprehension: 24, 'listen-comprehension': 26, 'read-comprehension': 24, 'speak-back': 18 };
  var DEFAULT_Q_SECONDS = 17;
  // 商業假設 (可調, 非從資料推導 — LTV 本質需這些輸入)。
  var ASSUME = { energyPerDay: 5, monthlyPrice: 149, convRate: 0.05, avgSubMonths: 6 };
  var TYPE_LABEL = {
    'narration': 'narration · 旁白(故事敘述)', 'listen-mc': 'listen-mc · 聽選(聽聲音 4 選 1)',
    'listen-tf': 'listen-tf · 聽是非(對/錯)', 'comprehension': 'comprehension · 理解(讀/聽)',
    'listen-comprehension': 'listen-comprehension · 聽力理解', 'read-comprehension': 'read-comprehension · 閱讀理解',
    'grammar-mc': 'grammar-mc · 文法選擇', 'tap-pairs': 'tap-pairs · 中英配對', 'phrase-pairs': 'phrase-pairs · 片語配對',
    'listen-pairs': 'listen-pairs · 聽力配對', 'type-translate': 'type-translate · 外文打字',
    'type-what-you-hear': 'type-what-you-hear · 聽打', 'tap-tiles': 'tap-tiles · 排句', 'drag-blank': 'drag-blank · 克漏字',
    'emoji-pick': 'emoji-pick · 看圖選', 'listen-emoji': 'listen-emoji · 聽音選圖', 'picture-mc': 'picture-mc · 看圖選句',
    'scroll-pick': 'scroll-pick · 滑選填空', 'read-and-tap': 'read-and-tap · 點詞', 'listen-build': 'listen-build · 聽力排句',
    'speak-back': 'speak-back · 跟讀'
  };
  var SEG_LABEL = { 'main-story': 'main-story · 主線故事', 'outer-prologue': 'outer-prologue · 開場序幕', 'aesop-side': 'aesop-side · 伊索支線', 'outer-outro': 'outer-outro · 結尾收場', 'review': 'review · 複習' };
  var LEVEL_LABEL = { A1: 'A1 · 入門', A2: 'A2 · 基礎', 'A2+': 'A2+ · 基礎進階', B1: 'B1 · 進階', B2: 'B2 · 高階' };
  var DIFF_LABEL = { easy: 'easy · 簡單', medium: 'medium · 中等', hard: 'hard · 困難' };
  var DASH = 'https://pickupwords.pages.dev/qa-dashboard.html';

  function esc(x) { return String(x).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function fmt(n) { return n.toLocaleString('en-US'); }
  function fmtDur(sec) { var h = Math.floor(sec / 3600), m = Math.round((sec % 3600) / 60); return h > 0 ? (h + ' 小時 ' + m + ' 分') : (m + ' 分'); }
  function newBucket() { return { chapters: [], typeCount: {}, segCount: {}, levelCount: {}, diffCount: {}, seconds: 0, lessons: 0, q: 0 }; }
  async function load(ch) {
    try { var r = await fetch('/lessons-ch' + ch + '.json'); if (!r.ok) return null; var a = await r.json(); return Array.isArray(a) ? a : null; }
    catch (e) { return null; }
  }
  async function computeBuckets() {
    var main = newBucket(), exam = newBucket();
    for (var ch = 0; ch <= 40; ch++) {
      var arr = await load(ch);
      if (!arr || !arr.length) continue;
      var b = ch >= EXAM_FROM ? exam : main;
      var cLessons = arr.length, cQ = 0, cType = {};
      for (var i = 0; i < arr.length; i++) {
        var l = arr[i];
        b.segCount[l.segmentType] = (b.segCount[l.segmentType] || 0) + 1;
        var qs = l.questions || [];
        for (var j = 0; j < qs.length; j++) {
          var qq = qs[j], t = qq.type;
          b.typeCount[t] = (b.typeCount[t] || 0) + 1; cType[t] = (cType[t] || 0) + 1; cQ++;
          b.seconds += (Q_SECONDS[t] != null ? Q_SECONDS[t] : DEFAULT_Q_SECONDS);
          if (qq.level) b.levelCount[qq.level] = (b.levelCount[qq.level] || 0) + 1;
          if (qq.difficulty) b.diffCount[qq.difficulty] = (b.diffCount[qq.difficulty] || 0) + 1;
        }
      }
      b.lessons += cLessons; b.q += cQ;
      var title = (arr[0] && arr[0].lessonName) ? arr[0].lessonName : ('Ch ' + ch);
      var dom = Object.keys(cType).sort(function (x, y) { return cType[y] - cType[x]; })[0] || '-';
      b.chapters.push({ ch: ch, title: title, lessons: cLessons, q: cQ, dom: dom });
    }
    return { main: main, exam: exam };
  }
  function subhead(txt) { return '<div style="font-size:13px;font-weight:900;color:var(--muted,#7a6850);margin:14px 0 8px;letter-spacing:.3px;">' + txt + '</div>'; }
  function renderType(b) {
    if (!b.q) return '<p class="desc">—</p>';
    var types = Object.keys(b.typeCount).sort(function (x, y) { return b.typeCount[y] - b.typeCount[x]; });
    return types.map(function (t) {
      var n = b.typeCount[t], pct = b.q ? (n / b.q * 100) : 0;
      return '<a class="row t-' + esc(t) + '" href="' + DASH + '" style="display:block;text-decoration:none;color:inherit;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<span class="label">' + esc(TYPE_LABEL[t] || t) + '</span>' +
        '<span class="count"><span class="pct">' + pct.toFixed(1) + '%</span>' + fmt(n) + '</span></div>' +
        '<div class="bar"><div class="fill" style="width:' + pct.toFixed(1) + '%"></div></div></a>';
    }).join('');
  }
  function renderSeg(b) {
    if (!b.lessons) return '<p class="desc">—</p>';
    var segs = Object.keys(b.segCount).sort(function (x, y) { return b.segCount[y] - b.segCount[x]; });
    return segs.map(function (sg) {
      var n = b.segCount[sg], pct = b.lessons ? (n / b.lessons * 100) : 0;
      return '<div class="row"><span class="label">' + esc(SEG_LABEL[sg] || sg) + '</span>' +
        '<span class="count"><span class="pct">' + pct.toFixed(1) + '%</span>' + fmt(n) + ' lesson</span>' +
        '<div class="bar"><div class="fill" style="width:' + pct.toFixed(1) + '%"></div></div></div>';
    }).join('');
  }
  function renderDist(countObj, total, labelMap) {
    var keys = Object.keys(countObj).sort(function (x, y) { return countObj[y] - countObj[x]; });
    if (!keys.length) return '<p class="desc">—</p>';
    return keys.map(function (k) {
      var n = countObj[k], pct = total ? (n / total * 100) : 0;
      return '<div class="row"><span class="label">' + esc(labelMap[k] || k) + '</span>' +
        '<span class="count"><span class="pct">' + pct.toFixed(1) + '%</span>' + fmt(n) + '</span>' +
        '<div class="bar"><div class="fill" style="width:' + pct.toFixed(1) + '%"></div></div></div>';
    }).join('');
  }
  function kpiCard(icon, title, big, sub, chips, note) {
    var chipHtml = (chips || []).map(function (c) { return '<span style="display:inline-block;background:var(--tint-warn,#fdf2dd);color:#7a5e25;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;margin:2px 4px 2px 0;">' + esc(c) + '</span>'; }).join('');
    return '<div style="flex:1;min-width:230px;background:#fff;border:2px solid #e5e0d6;border-bottom:4px solid #e0dacf;border-radius:16px;padding:16px 16px 14px;">' +
      '<div style="font-size:13px;font-weight:900;color:var(--muted,#7a6850);">' + icon + ' ' + esc(title) + '</div>' +
      '<div style="font-size:30px;font-weight:900;color:var(--text,#3c2a1c);line-height:1.1;margin:6px 0 2px;">' + big + '</div>' +
      (sub ? '<div style="font-size:13px;font-weight:700;color:var(--muted,#7a6850);">' + sub + '</div>' : '') +
      (chipHtml ? '<div style="margin:8px 0 4px;">' + chipHtml + '</div>' : '') +
      (note ? '<div style="font-size:12px;color:var(--muted,#7a6850);line-height:1.5;margin-top:4px;">' + note + '</div>' : '') +
      '</div>';
  }
  function chapterRowsHtml(list) {
    return list.map(function (c) {
      return '<tr><td class="ch">' + c.ch + '</td><td class="title">' + esc(c.title) + '</td>' +
        '<td class="r">' + c.lessons + '</td><td class="r">' + c.q + '</td>' +
        '<td class="dom">' + esc(c.dom) + '</td></tr>';
    }).join('');
  }
  return { EXAM_FROM: EXAM_FROM, ASSUME: ASSUME, TYPE_LABEL: TYPE_LABEL, SEG_LABEL: SEG_LABEL, LEVEL_LABEL: LEVEL_LABEL, DIFF_LABEL: DIFF_LABEL, DASH: DASH,
    esc: esc, fmt: fmt, fmtDur: fmtDur, computeBuckets: computeBuckets, subhead: subhead,
    renderType: renderType, renderSeg: renderSeg, renderDist: renderDist, kpiCard: kpiCard, chapterRowsHtml: chapterRowsHtml };
})();

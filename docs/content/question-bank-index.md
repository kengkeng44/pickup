# 題庫地圖 (Question Bank Index) — 自動產生

> 由 `tools/gen-bank-index.cjs` 產生。**不要手改本檔**, 題庫變動後重跑:
> `node tools/gen-bank-index.cjs`

題庫實體 = `public/lessons-ch{0..31}.json`, 一章一檔, Zod schema 驗證, CI 把關。
增 / 改 / 刪題的 SOP 見 `docs/content/MAINTENANCE.md`。

## 全題庫一覽

- 章數: **32**　節數 (lessons): **224**　真題 (不含旁白): **3136**　旁白: **1188**
- 估總時長: **約 1053 分**　平均每節: **約 4.7 分**

### 全域題型分佈 (不含旁白)

| 題型 | 數量 | 佔比 |
|------|-----:|-----:|
| comprehension | 821 | 26.2% |
| listen-tf | 749 | 23.9% |
| listen-mc | 524 | 16.7% |
| emoji-pick | 397 | 12.7% |
| tap-pairs | 294 | 9.4% |
| phrase-pairs | 176 | 5.6% |
| grammar-mc | 81 | 2.6% |
| picture-mc | 64 | 2.0% |
| scroll-pick | 22 | 0.7% |
| listen-emoji | 7 | 0.2% |
| listen-pairs | 1 | 0.0% |
| narration (旁白·非題) | 1188 | — |

## 每章明細

| 章 | 檔案 | 故事 | 節數 | 真題 | 每節估時 | 題型分佈 |
|---:|------|------|---:|---:|---:|------|
| 0 | `lessons-ch0.json` | ground-floor | 7 | 107 | ~4.6m | listen-tf 26、narration 21、scroll-pick 20、comprehension 17、emoji-pick 15、picture-mc 13、listen-emoji 7、tap-pairs 7、grammar-mc 2 |
| 1 | `lessons-ch1.json` | momotaro | 7 | 102 | ~5.1m | narration 40、comprehension 32、listen-tf 21、tap-pairs 14、listen-mc 13、emoji-pick 8、phrase-pairs 7、picture-mc 2、scroll-pick 2、grammar-mc 2、listen-pairs 1 |
| 2 | `lessons-ch2.json` | ugly-duckling | 7 | 99 | ~4.8m | narration 42、comprehension 28、listen-tf 24、listen-mc 14、picture-mc 10、phrase-pairs 8、tap-pairs 7、emoji-pick 6、grammar-mc 2 |
| 3 | `lessons-ch3.json` | tortoise-hare | 7 | 112 | ~5.2m | narration 35、comprehension 35、listen-tf 28、listen-mc 14、picture-mc 12、tap-pairs 7、emoji-pick 7、phrase-pairs 7、grammar-mc 2 |
| 4 | `lessons-ch4.json` | camel-hump | 7 | 105 | ~5.2m | narration 42、listen-tf 28、comprehension 24、listen-mc 14、phrase-pairs 14、emoji-pick 10、tap-pairs 7、picture-mc 6、grammar-mc 2 |
| 5 | `lessons-ch5.json` | baba-yaga | 7 | 97 | ~4.6m | narration 36、comprehension 27、listen-tf 25、listen-mc 14、tap-pairs 7、phrase-pairs 7、emoji-pick 7、picture-mc 7、grammar-mc 3 |
| 6 | `lessons-ch6.json` | six-swans | 7 | 105 | ~4.8m | narration 28、comprehension 28、listen-tf 26、listen-mc 21、tap-pairs 7、phrase-pairs 7、emoji-pick 7、picture-mc 7、grammar-mc 2 |
| 7 | `lessons-ch7.json` | yexian | 7 | 98 | ~4.7m | narration 35、comprehension 28、listen-tf 26、listen-mc 14、tap-pairs 7、phrase-pairs 7、emoji-pick 7、picture-mc 7、grammar-mc 2 |
| 8 | `lessons-ch8.json` | three-pigs | 7 | 85 | ~4.4m | narration 41、listen-tf 20、listen-mc 15、emoji-pick 14、comprehension 14、phrase-pairs 13、tap-pairs 7、grammar-mc 2 |
| 9 | `lessons-ch9.json` | cinderella | 7 | 85 | ~4.4m | narration 41、listen-tf 19、listen-mc 15、emoji-pick 14、phrase-pairs 14、comprehension 14、tap-pairs 7、grammar-mc 2 |
| 10 | `lessons-ch10.json` | change | 7 | 84 | ~4.3m | narration 42、listen-tf 20、comprehension 20、listen-mc 14、emoji-pick 13、phrase-pairs 8、tap-pairs 7、grammar-mc 2 |
| 11 | `lessons-ch11.json` | houyi | 7 | 99 | ~4.8m | narration 41、listen-tf 25、emoji-pick 21、comprehension 21、listen-mc 15、tap-pairs 7、phrase-pairs 7、grammar-mc 3 |
| 12 | `lessons-ch12.json` | cowherd-weaver | 7 | 99 | ~4.8m | narration 41、listen-tf 22、comprehension 21、emoji-pick 20、listen-mc 15、tap-pairs 7、phrase-pairs 7、grammar-mc 7 |
| 13 | `lessons-ch13.json` | red-riding-hood | 7 | 98 | ~4.8m | narration 42、listen-tf 21、emoji-pick 21、comprehension 21、listen-mc 14、tap-pairs 7、phrase-pairs 7、grammar-mc 7 |
| 14 | `lessons-ch14.json` | urashima | 7 | 84 | ~4.2m | narration 42、listen-tf 21、comprehension 19、listen-mc 14、emoji-pick 14、tap-pairs 7、phrase-pairs 7、grammar-mc 2 |
| 15 | `lessons-ch15.json` | emperors-new-clothes | 7 | 91 | ~4.4m | narration 35、listen-mc 21、listen-tf 20、comprehension 20、emoji-pick 14、tap-pairs 7、phrase-pairs 7、grammar-mc 2 |
| 16 | `lessons-ch16.json` | issun-boshi | 7 | 84 | ~4.2m | narration 42、listen-tf 21、comprehension 19、listen-mc 14、emoji-pick 14、tap-pairs 7、phrase-pairs 7、grammar-mc 2 |
| 17 | `lessons-ch17.json` | crane-gratitude | 7 | 91 | ~4.5m | narration 42、comprehension 35、listen-tf 21、listen-mc 14、tap-pairs 7、emoji-pick 7、phrase-pairs 7 |
| 18 | `lessons-ch18.json` | heungbu-nolbu | 7 | 91 | ~4.5m | narration 42、comprehension 35、listen-tf 21、listen-mc 14、tap-pairs 7、emoji-pick 7、phrase-pairs 7 |
| 19 | `lessons-ch19.json` | sang-kancil | 7 | 98 | ~4.7m | comprehension 42、narration 35、listen-tf 21、listen-mc 14、tap-pairs 7、emoji-pick 7、phrase-pairs 7 |
| 20 | `lessons-ch20.json` | enormous-turnip | 7 | 98 | ~4.7m | narration 35、comprehension 33、listen-tf 21、tap-pairs 14、listen-mc 14、emoji-pick 14、grammar-mc 2 |
| 21 | `lessons-ch21.json` | anansi-spider | 7 | 98 | ~4.7m | narration 35、comprehension 28、listen-tf 24、listen-mc 21、tap-pairs 14、emoji-pick 11 |
| 22 | `lessons-ch22.json` | mencius-mother | 7 | 98 | ~4.7m | narration 35、comprehension 28、listen-mc 21、listen-tf 21、tap-pairs 14、emoji-pick 14 |
| 23 | `lessons-ch23.json` | sima-guang | 7 | 105 | ~4.9m | narration 35、listen-tf 28、comprehension 26、listen-mc 21、emoji-pick 14、tap-pairs 7、phrase-pairs 7、grammar-mc 2 |
| 24 | `lessons-ch24.json` | kong-rong | 7 | 105 | ~4.9m | narration 35、listen-tf 28、comprehension 26、listen-mc 21、emoji-pick 14、tap-pairs 7、phrase-pairs 7、grammar-mc 2 |
| 25 | `lessons-ch25.json` | yugong | 7 | 105 | ~4.9m | narration 35、listen-tf 28、comprehension 26、listen-mc 21、emoji-pick 14、tap-pairs 7、phrase-pairs 7、grammar-mc 2 |
| 26 | `lessons-ch26.json` | archimedes-eureka | 7 | 98 | ~4.7m | narration 35、listen-mc 21、listen-tf 21、comprehension 21、tap-pairs 14、emoji-pick 14、grammar-mc 7 |
| 27 | `lessons-ch27.json` | journey-to-west-series | 7 | 97 | ~4.6m | narration 36、listen-tf 22、comprehension 21、listen-mc 19、tap-pairs 14、emoji-pick 14、grammar-mc 7 |
| 28 | `lessons-ch28.json` | zhuge-liang-strategems | 7 | 105 | ~4.9m | narration 35、comprehension 28、listen-mc 21、listen-tf 21、tap-pairs 14、emoji-pick 14、grammar-mc 7 |
| 29 | `lessons-ch29.json` | odyssey | 7 | 105 | ~4.9m | narration 35、comprehension 28、listen-tf 26、listen-mc 21、tap-pairs 14、emoji-pick 14、grammar-mc 2 |
| 30 | `lessons-ch30.json` | heracles-twelve-labors | 7 | 105 | ~4.9m | narration 35、comprehension 28、listen-tf 26、listen-mc 21、tap-pairs 14、emoji-pick 14、grammar-mc 2 |
| 31 | `lessons-ch31.json` | robin-hood | 7 | 103 | ~4.9m | narration 37、comprehension 28、listen-tf 27、listen-mc 19、tap-pairs 14、emoji-pick 13、grammar-mc 2 |

---
*題型分佈標準見 `docs/standards/2026-06-22-question-distribution-standard.md`。*

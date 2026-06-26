# 題庫地圖 (Question Bank Index) — 自動產生

> 由 `tools/gen-bank-index.cjs` 產生。**不要手改本檔**, 題庫變動後重跑:
> `node tools/gen-bank-index.cjs`

題庫實體 = `public/lessons-ch{0..31}.json`, 一章一檔, Zod schema 驗證, CI 把關。
增 / 改 / 刪題的 SOP 見 `docs/content/MAINTENANCE.md`。

## 全題庫一覽

- 章數: **32**　節數 (lessons): **222**　真題 (不含旁白): **2996**　旁白: **1150**
- 估總時長: **約 1011 分**　平均每節: **約 4.6 分**

### 全域題型分佈 (不含旁白)

| 題型 | 數量 | 佔比 |
|------|-----:|-----:|
| comprehension | 780 | 26.0% |
| listen-tf | 708 | 23.6% |
| listen-mc | 513 | 17.1% |
| emoji-pick | 390 | 13.0% |
| tap-pairs | 292 | 9.7% |
| phrase-pairs | 174 | 5.8% |
| grammar-mc | 81 | 2.7% |
| picture-mc | 57 | 1.9% |
| scroll-pick | 1 | 0.0% |
| narration (旁白·非題) | 1150 | — |

## 每章明細

| 章 | 檔案 | 故事 | 節數 | 真題 | 每節估時 | 題型分佈 |
|---:|------|------|---:|---:|---:|------|
| 0 | `lessons-ch0.json` | ground-floor | 5 | 28 | ~1.9m | narration 10、picture-mc 8、emoji-pick 6、listen-tf 5、tap-pairs 4、comprehension 3、phrase-pairs 1、grammar-mc 1 |
| 1 | `lessons-ch1.json` | momotaro | 7 | 82 | ~4.1m | narration 31、comprehension 23、listen-tf 16、tap-pairs 13、listen-mc 10、emoji-pick 8、phrase-pairs 6、grammar-mc 3、picture-mc 2、scroll-pick 1 |
| 2 | `lessons-ch2.json` | ugly-duckling | 7 | 80 | ~3.9m | narration 32、comprehension 20、listen-tf 17、listen-mc 10、picture-mc 9、tap-pairs 8、emoji-pick 7、phrase-pairs 7、grammar-mc 2 |
| 3 | `lessons-ch3.json` | tortoise-hare | 7 | 90 | ~4.2m | narration 27、comprehension 25、listen-tf 20、picture-mc 11、listen-mc 10、tap-pairs 8、emoji-pick 8、phrase-pairs 6、grammar-mc 2 |
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

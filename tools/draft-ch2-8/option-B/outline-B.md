# Option B — Home is the People Who Let You Go

> **Thesis**: 阿嬤的門永遠開著。整 8 章,貓不是被「留下」的,是被「不阻止」的。Love language = non-possession。
> **3-word arc**: rescued → wandered → returned-freely
> **Strongest moment**: Ch5 + Ch8(門總是開的,重複本身就是愛的語言)

## 結構總覽

| Ch | Title | 情緒 shift | 主旨 keyword |
|----|-------|-----------|--------------|
| 1 | Rainy Night(已上線) | alone → noticed | (Ch1 微調:阿嬤沒說「跟我來」,只是撐開傘)|
| 2 | The Open Door | 警戒 → 試探 | door / outside / walk |
| 3 | The Street | 試探 → 受驚回返 | afraid / **still open** |
| 4 | Quiet Garden | 受驚回返 → 願意靠近 | near / quiet / touch(她不摸我)|
| 5 | **Rain Again**(thesis-peak A) | 願意靠近 → 自己選擇回家 | **always / stay / come back** |
| 6 | Summer Wander | 自己選擇回家 → 走更遠也敢回 | follow / lost / smell |
| 7 | She is Old | 走更遠也敢回 → 想為她留 | tired / old / **still open** |
| 8 | **Home**(thesis-peak B) | 想為她留 → 不需言語的歸屬 | asleep / **home** / **come back** |

## 關鍵句頻率(thesis 重複建構)

- `open` × 5 章(Ch2/3/5/7/8)
- `door` × 5 章
- `come back` × 2 章(Ch5/Ch8)
- `still / always` × 3 章(Ch3/Ch5/Ch7)
- `home` × 4 章(Ch3/Ch5/Ch6/Ch8)

→ 重複 = 愛的語言。Ch1 的 `home` 是「想回的地方」,Ch8 的 `home` 是「可以離開也可以回來的地方」。

## 文法 pattern(全 48 題只用 3 種)

1. `I [verb] [object]` — I see, I walk, I come back, I smell, I sit
2. `[Subject] is [adj]` — The door is open. She is old. The night is cold.
3. `I feel [adj]` — I feel safe. I feel afraid.

零 phrasal verb / 零 contraction / 零 idiom / 零專有名詞 / 零複合時態。

## 與 Ch1 的銜接

Ch1 阿嬤撐藍傘出現的「kind face」現在在 Option B 下重新詮釋:
- 不是「主動收養我」,只是「打開傘」
- 我跟著是因為冷,不是因為被邀請

→ Ch2 早上門開著(沒鎖)→ 整個 thesis 啟動。

## Files in this folder

- `ch2.json` ~ `ch8.json` — 7 chapter × 6 question = 42 question JSON,schema-compliant
- 整合時 append 到 `public/story-kitten.json`(在 kt-ch1-06 後面)+ 更新 schema `questionInChapter.max(6)` 仍 OK(已是 6)+ Zod chapter id 擴 1→8

## Known issues fixed before save

1. ✅ Ch8-Q5 tile index reuse(agent flagged):tile pool 加 second "I",correctOrder 變 [0,1,2,3,4,5]
2. ✅ type-what-you-hear options 從 1 個補成 4 個(schema 要 tuple of 4):每題加 3 個視覺干擾詞
3. ✅ tap-pairs `correctIndex: 0` 保持(跟 Ch1 一致)

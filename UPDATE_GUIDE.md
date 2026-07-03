# 網站更新指南

這份文件教你日後怎麼自己更新網站內容,不需要重寫程式碼,只要改對應的資料檔案即可。

網站的文字、圖片路徑、專案清單，都集中放在 `src/data/` 這個資料夾裡，跟畫面的元件（`src/components/`）是分開的。所以大部分修改都只需要動 `src/data/` 底下的檔案。

---

## 1. 新增 / 修改 Projects（專案作品）

檔案位置：[src/data/projects.ts](src/data/projects.ts)

每個專案是陣列 `projects` 裡的一個物件，長這樣：

```ts
{
  id: 'life-insight-ai',              // 唯一代號，會出現在網址上，用英文小寫+連字號
  category: 'Data & Systems',         // 只能是下面三選一
  name: 'Life Insight AI',            // 顯示的專案名稱
  summary: 'Emotion Tracking · Streamlit · Data Visualization', // 卡片上的一行副標
  tags: ['Streamlit', 'Python', 'Data Visualization', 'Emotion AI'], // 標籤
  image: '/images/life-insight-ai.png', // 圖片路徑，見下方「放照片」章節
  github: 'https://github.com/huiyutseng/life-insight-ai', // 沒有就整行刪掉或設 undefined
  demo: undefined,                    // 有 demo 網址就填，沒有留 undefined
  featured: true,                     // 只能有「一個」專案設 true（首頁精選區用）
  detail: {
    problem: '...',                  // 詳細頁的「問題」段落
    approach: '...',                 // 詳細頁的「做法」段落
    result: '...',                   // 詳細頁的「結果」段落
  },
},
```

**新增一個專案**：複製上面一整個物件貼進 `projects` 陣列裡，改內容即可，順序就是網站上顯示的順序。

**分類**只能用這三種之一（定義在同檔案最上面的 `PROJECT_CATEGORIES`）：
- `'Data & Systems'`
- `'AI & Interaction'`
- `'Creative Experiments'`

如果想要新增第四種分類，要同時在 `PROJECT_CATEGORIES` 陣列與 `src/data/types.ts` 的 `ProjectCategory` 型別加上去。

**精選專案（首頁 Featured 區塊）**：只有一個專案能設 `featured: true`，如果想換人，記得把舊的那個拿掉、只留新的一個是 `true`。

---

## 2. 首頁放照片 / 換圖片

所有圖片都放在 [public/images/](public/images/) 資料夾，程式碼裡用 `/images/檔名.jpg` 這種路徑指到它。**目前這個資料夾是空的**，所以現在畫面上看到的都是漸層佔位圖（fallback），只要把對應檔名的圖片放進去，畫面會自動換成真實照片，不用改任何程式碼。

常用的圖片位置：

| 用途 | 路徑（在 `src/data/site.ts`） | 放檔案到 |
|---|---|---|
| 首頁大頭照 | `hero.portraitImage` = `/images/profile.jpg` | `public/images/profile.jpg` |
| 聯絡區裝置預覽圖 | `contact.devicePreviewImage` = `/images/device-preview.png` | `public/images/device-preview.png` |
| 履歷 PDF | `contact.resumePath` = `/resume/resume.pdf` | `public/resume/resume.pdf` |
| 各專案卡片圖 | 每個專案物件的 `image` 欄位 | `public/images/<那個路徑>` |

**换照片的兩種方式：**
1. **檔名相同**：直接把新照片改名成上表對應的檔名（例如 `profile.jpg`），覆蓋放進 `public/images/`。
2. **想用新檔名**：把照片放進 `public/images/`，然後去 `src/data/site.ts` 或 `src/data/projects.ts` 把對應路徑改成新檔名，例如 `/images/my-new-photo.jpg`。

> 圖片路徑一律用 `/images/xxx`（開頭的 `/` 不能省略），因為程式會自動幫你補上網站的 base 路徑（`/personal_page/`）。

---

## 3. 修改文字內容（標題、自我介紹、聯絡資訊）

檔案位置：[src/data/site.ts](src/data/site.ts)

這個檔案集中了全站幾乎所有的文字，包括：

- `hero`：首頁大標題、打招呼文字、按鈕文字
- `about`：關於我的三個欄位標題與內文
- `projects` / `journey` / `contact`：各區塊的標題與副標
- `contact`：Email、GitHub、LinkedIn 連結、履歷連結
- `footer`：頁尾版權文字

直接改對應的字串就好，**不需要改任何元件（.tsx）檔案**。

---

## 4. 新增 / 修改 Journey（成長歷程時間軸）

檔案位置：[src/data/journey.ts](src/data/journey.ts)

跟 Projects 類似，是一個陣列，每個里程碑長這樣：

```ts
{
  id: 'exchange-mannheim',
  icon: 'Globe2',   // 只能用下方允許清單裡的圖示名稱
  title: 'Exchange in Mannheim',
  description: '拓展國際視野，體驗不同文化與思維',
},
```

`icon` 目前只支援這 5 種（定義在 [src/data/types.ts](src/data/types.ts) 的 `JourneyMilestone`）：
`ShieldCheck` / `Landmark` / `Globe2` / `GraduationCap` / `BrainCircuit`

如果想用其他圖示，需要：
1. 去 `src/data/types.ts` 的 `icon` 型別加上新名稱
2. 去 `src/components/JourneySection.tsx` 裡把該名稱對應到 [lucide-react](https://lucide.dev/icons/) 的圖示元件

---

## 5. 改完之後怎麼預覽（本機看效果）

在 `personal_page/` 資料夾下開終端機：

```bash
npm run dev
```

會啟動本機預覽伺服器，網址通常是 `http://localhost:5173/personal_page/`，改資料檔存檔後畫面會自動更新。

---

## 6. 改完之後怎麼發布上線

確認本機看起來沒問題後：

```bash
git add -A
git commit -m "說明這次改了什麼"
git push origin main
```

push 上去之後，GitHub Actions 會自動 build 並部署到 GitHub Pages，大約 1-3 分鐘後這裡就會更新：

**https://huiyutseng.github.io/personal_page/**

可以到 https://github.com/huiyutseng/personal_page/actions 看部署進度（有兩個綠勾 build + deploy 代表成功）。

> 如果瀏覽器看到的還是舊畫面，通常是快取問題，按 `Ctrl+Shift+R` 強制重新整理，或開無痕視窗看。

---

## 檔案速查表

| 我想做的事 | 該改的檔案 |
|---|---|
| 新增/修改一個作品專案 | `src/data/projects.ts` |
| 換首頁大頭照 / 聯絡區圖片 / 履歷 | `public/images/`、`public/resume/`（檔案本身）+ `src/data/site.ts`（路徑） |
| 改標題、自我介紹文字、聯絡資訊 | `src/data/site.ts` |
| 新增/修改成長歷程時間軸 | `src/data/journey.ts` |
| 換 favicon（分頁小圖示） | `public/favicon.svg` |

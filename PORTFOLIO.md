![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# GitHub Copilot 實戰工作坊待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。使用者可以在瀏覽器中管理日常待辦事項，並透過篩選、完成狀態與主題設定，建立簡單且實用的個人工作流程。

## 線上展示

[查看 GitHub Pages 線上版本](https://alan-lun.github.io/my-copilot-workshop/)

> 請將上方網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub 帳號與儲存庫名稱。

## 功能

- 新增待辦事項。
- 待辦文字最多 100 個字元，空白內容不會建立項目。
- 將待辦事項標記為已完成或未完成。
- 刪除單一待辦事項。
- 依照全部、未完成或已完成篩選清單。
- 顯示目前未完成的待辦事項數量。
- 一次清除所有已完成事項，刪除前會要求確認。
- 待辦清單為空或篩選結果為空時，顯示對應提示文字。
- 支援淺色模式與深色模式切換。
- 儲存使用者選擇的主題設定，下次開啟時保留偏好。
- 第一次使用時，會依照作業系統的深色模式偏好決定初始主題。
- 將待辦事項儲存在瀏覽器的 `localStorage`，重新載入頁面後仍可保留資料。
- 使用基本的可及性標記，例如按鈕狀態、替代標籤與即時更新清單區域。

## 技術

- 使用純 HTML 建立頁面結構。
- 使用 CSS 設計版面、元件樣式與淺色／深色主題。
- 使用原生 JavaScript 處理資料、DOM 更新與使用者互動。
- 不使用任何前端框架、函式庫或外部套件。
- 使用瀏覽器 `localStorage` 儲存待辦事項與主題偏好。
- 使用事件監聽與事件委派處理表單、清單和按鈕操作。

## 開發方式

這個專案透過 GitHub Copilot Agent Mode、MCP 與 `.github/prompts` 中的提示文件，實作一套 agentic workflow：

- 使用 GitHub Copilot Agent Mode 協助理解需求、探索專案檔案、規劃修改內容與完成實作。
- 使用 MCP 連接可用的開發工具與工作流程資源，協助取得專案脈絡並執行相關開發任務。
- 使用 `.github/prompts` 中的提示文件，將常見的修正與開發任務整理成可重複使用的工作指引。
- 由開發者檢視 Copilot 的建議、確認修改範圍，並透過瀏覽器實際驗證結果。

## 我學到什麼

- 如何使用原生 JavaScript 管理表單提交、清單渲染與事件委派。
- 如何使用 `localStorage` 保存前端應用程式的資料與使用者偏好。
- 如何設計全部、未完成與已完成等篩選狀態，讓同一份資料呈現不同視圖。
- 如何使用 GitHub Copilot Agent Mode 與 MCP 輔助拆解需求、修改程式與驗證結果。
- 如何透過 `.github/prompts` 建立較一致、可重複的 agentic workflow。

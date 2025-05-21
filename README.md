# SuperDocChatUI

Next.js chatbot UI powered by ChatPDF API.

[日本語版はこちら](#japanese)

<img width="986" alt="Image" src="https://github.com/user-attachments/assets/18d06fce-e9b3-4a4c-87ee-8ab981ebb1e6" />

## Features

* Chat interface for asking questions
* AI answers via ChatPDF API
* Responsive (desktop & mobile)
* Example questions included
* Markdown formatting supported
* English and Japanese support
* Easy configuration via `site.ts`

## Requirements

* Node.js 18+
* Docker & Docker Compose (optional)
* ChatPDF API key and source ID

## Setup

```bash
git clone git@github.com:hoominkani/SuperDocChatUI.git
cp .env.example .env.local
cp config/site.ts.example config/site.ts
```

Add your credentials to `.env.local`:

```
NEXT_PUBLIC_CHATPDF_API_KEY=your_api_key
NEXT_PUBLIC_CHATPDF_SOURCE_ID=your_source_id
```

## Development

### With Node.js

```bash
npm install
npm run dev
```

### With Docker

```bash
docker compose up
# To stop:
docker compose down
```

Visit [http://localhost:3000](http://localhost:3000)

## Configuration (`config/site.ts`)

```ts
export const siteConfig = {
  defaultLanguage: 'en', // or 'ja'
  languages: { en, ja }
};
```

You can set:

* Site title, subtitle, icon
* Example questions
* Modal texts
* Info message
* External link

## Production Build

```bash
npm run build
npm start
```

## Docker Production

```bash
docker build -t super-doc-chat-ui .
docker run -p 3000:3000 super-doc-chat-ui
```

---

<details>
<summary><h1 id="japanese">SuperDocChatUI（日本語）</h1></summary>

ChatPDF API を使った PDF 質問用チャットアプリケーション

## 機能

* チャット形式での質問・回答
* ChatPDF API を使用した AI 応答
* モバイル対応のレスポンシブUI
* 質問例をあらかじめ表示
* Markdown形式の回答表示
* 英語・日本語対応
* `site.ts` でカスタマイズ可能

## 必要環境

* Node.js 18以上
* Docker / Docker Compose（任意）
* ChatPDF APIキーとソースID

## セットアップ

```bash
git clone git@github.com:hoominkani/SuperDocChatUI.git
cp .env.example .env.local
cp config/site.ts.example config/site.ts
```

`.env.local` に以下を記入：

```
NEXT_PUBLIC_CHATPDF_API_KEY=あなたのAPIキー
NEXT_PUBLIC_CHATPDF_SOURCE_ID=あなたのソースID
```

## 開発モード起動

### Node.jsの場合

```bash
npm install
npm run dev
```

### Dockerの場合

```bash
docker compose up
# 停止するには
docker compose down
```

## 設定ファイル（`config/site.ts`）

```ts
export const siteConfig = {
  defaultLanguage: 'ja',
  languages: { en, ja }
};
```

以下を編集可能：

* タイトル・アイコン
* サブタイトル
* 質問例
* モーダル内容
* 補足メッセージ
* 外部リンク

## 本番環境

```bash
npm run build
npm start
```

## Dockerでの本番運用

```bash
docker build -t super-doc-chat-ui .
docker run -p 3000:3000 super-doc-chat-ui
```

</details>

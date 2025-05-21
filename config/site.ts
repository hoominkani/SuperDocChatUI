export const siteConfig = {
  defaultLanguage: 'en' as const,

  get title() {
    return this.languages[this.defaultLanguage].title;
  },
  get subtitle() {
    return this.languages[this.defaultLanguage].subtitle;
  },
  get additionalInfo() {
    return this.languages[this.defaultLanguage].additionalInfo;
  },
  get initialQuestions() {
    return this.languages[this.defaultLanguage].initialQuestions;
  },
  get modal() {
    return this.languages[this.defaultLanguage].modal;
  },
  get questions() {
    return this.languages[this.defaultLanguage].questions;
  },
  get officialSite() {
    // 外部リンク先は共通のURLを保持しつつ、messageだけ言語ごとに切り替えたい場合
    return {
      ...this.languages[this.defaultLanguage].officialSite,
      url: 'https://docs.example.com', // 共通URL
      enabled: true
    };
  },

  // 多言語定義本体
  languages: {
    en: {
      title: 'SuperDocChatUI',
      subtitle: 'AI Assistant answers your questions.',
      additionalInfo: '☀️This assistant forgets previous conversations, so please ask one independent question at a time.',
      initialQuestions: [
        'How do I use this application?',
        'What kind of questions can you answer?',
        'What are the features of the AI assistant?',
        'How often is the data updated?'
      ],
      questions: {
        header: 'Example Questions',
        placeholder: 'Type your question here...',
        send: 'Send',
        sending: 'Sending...',
      },
      modal: {
        title: 'How it works',
        description: [
          'The AI assistant learns from provided documents to generate answers.',
          'The system internally reads PDFs, so it might occasionally mention PDFs, but please ignore that 😅'
        ],
        closeButton: 'Close'
      },
      officialSite: {
        message: 'For more information, please check the <a href="{url}" target="_blank" rel="noopener noreferrer">official documentation</a>.',
      }
    },
    ja: {
      title: 'SuperDocChatUI',
      subtitle: 'AIアシスタントがあなたの質問に答えます。',
      additionalInfo: '☀️このアシスタントは、前の話を忘れてしまうので、一つ一つ、独立した質問をしてください。',
      initialQuestions: [
        'このアプリケーションの使い方は？',
        'どんな質問に答えられますか？',
        'AIアシスタントの特徴は？',
        'データの更新頻度は？'
      ],
      questions: {
        header: '質問の例',
        placeholder: '質問を入力してください...',
        send: '送信',
        sending: '送信中...',
      },
      modal: {
        title: '仕組み',
        description: [
          'AIアシスタントは、提供された文書を学習して回答を生成します。',
          'システム内部ではPDFを読み込んでいるため、たまにPDFについて言及することがありますが、気にしないでください😅'
        ],
        closeButton: '閉じる'
      },
      officialSite: {
        message: 'より詳しい情報は<a href="{url}" target="_blank" rel="noopener noreferrer">公式ドキュメント</a>をご覧ください。',
      }
    }
  }
};

"use client";

import { useState } from 'react';

interface Message {
  role: string;
  content: string;
  isHtml?: boolean;
  isError?: boolean;
}

interface ChatHookResult {
  messages: Message[];
  questionCount: number;
  hasAnswers: boolean;
  isLoading: boolean;
  sendMessage: (questionText: string) => Promise<void>;
}

export default function useChat(): ChatHookResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [hasAnswers, setHasAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (questionText: string) => {
    if (isLoading || !questionText.trim()) return;

    setIsLoading(true);
    
    // Increment question counter
    setQuestionCount(prevCount => prevCount + 1);

    // Add user message
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: questionText }
    ]);

    try {
      // Add additional instructions to the query
      const sendText = `${questionText} ※ PDFファイルを最後のページまでよく読み込んで、じっくり考えてから回答して。単語や動詞を類語に変換して何度か検索し直すなどして、曖昧な検索でも情報を主時できるようにして。ステップバイステップで調査してください。まず、結論を一言で述べてから、具体的な説明を始めてください。ページ数への言及は不要です。返答は、概要だけでなく、詳細な調査結果を箇条書きなどで見やすく整形して返答してください。返答は「〜じゃ」などお爺さん口調で書いてください`;

      const response = await fetch('https://api.chatpdf.com/v1/chats/message', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CHATPDF_API_KEY || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sourceId: process.env.NEXT_PUBLIC_CHATPDF_SOURCE_ID || '',
          messages: [{ role: 'user', content: sendText }]
        })
      });

      if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            role: 'assistant', 
            content: 'ごめんよ、通信エラーじゃ。質問を変えるか、新婦にLINEで相談してくれ', 
            isError: true 
          }
        ]);
      } else {
        const data = await response.json();
        let content = data.content;
        
        // Clean up PDFファイル references
        content = content.replace('申し訳ないが、PDFファイルを直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ないが、PDFファイルの内容を直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ありませんが、PDFファイルの内容を直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ないが、指定されたPDFファイルの内容を直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ありませんが、指定されたPDFファイルを直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        
        // Add assistant message
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content }
        ]);
        
        // Add official site reference message
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            role: 'assistant', 
            content: 'より正確な情報は<a href="https://shigira.com" target="_blank" rel="noopener noreferrer">公式サイト</a>を参照しておくれ。', 
            isHtml: true 
          }
        ]);

        setHasAnswers(true);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: 'ごめんよ、通信エラーじゃ。質問を変えるか、新婦にLINEで相談してくれ', 
          isError: true 
        }
      ]);
    }

    setIsLoading(false);
  };

  return {
    messages,
    questionCount,
    hasAnswers,
    isLoading,
    sendMessage
  };
}
"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Subtitle from '@/components/Subtitle';
import AdditionalInfo from '@/components/AdditionalInfo';
import ChatSection from '@/components/ChatSection';
import InputArea from '@/components/InputArea';
import InfoModal from '@/components/InfoModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [hasAnswers, setHasAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string; isHtml?: boolean; isError?: boolean }[]>([]);
  const [showInitialQuestions, setShowInitialQuestions] = useState(true);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const resetApplication = () => {
    setQuestionCount(0);
    setHasAnswers(false);
    setMessages([]);
    setShowInitialQuestions(true);
    setIsChatExpanded(false);

    if (window.innerWidth > 768) {
      const container = document.querySelector('.container') as HTMLElement;
      if (container) {
        container.style.height = '';
        container.style.minHeight = '650px';
      }
    }
  };

  const handleSendMessage = async (questionText: string) => {
    if (isLoading || !questionText.trim()) return;

    setIsLoading(true);
    
    if (questionCount === 0) {
      setShowInitialQuestions(false);
      
      if (window.innerWidth > 768) {
        const container = document.querySelector('.container') as HTMLElement;
        if (container) {
          container.style.height = '85vh';
          container.style.minHeight = '85vh';
        }
      }
    }

    setQuestionCount(prevCount => prevCount + 1);

    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: questionText }
    ]);

    try {
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
        
        content = content.replace('申し訳ないが、PDFファイルを直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ないが、PDFファイルの内容を直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ありませんが、PDFファイルの内容を直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ないが、指定されたPDFファイルの内容を直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        content = content.replace('申し訳ありませんが、指定されたPDFファイルを直接読み込むことはできんのじゃ。しかし、', 'うむ。');
        
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content }
        ]);
        
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            role: 'assistant', 
            content: 'より正確な情報は<a href="https://shigira.com" target="_blank" rel="noopener noreferrer">公式サイト</a>を参照しておくれ。', 
            isHtml: true 
          }
        ]);

        setHasAnswers(true);
        setIsChatExpanded(true);
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

  const handleInitialQuestion = (questionText: string) => {
    handleSendMessage(questionText);
  };

  useEffect(() => {
    const chatDiv = document.querySelector('.chat');
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container">
      <Header 
        onInfoClick={toggleModal} 
        onTitleClick={resetApplication}
      />
      <Subtitle hidden={!showInitialQuestions} />
      <AdditionalInfo show={hasAnswers} />
      
      <ChatSection 
        messages={messages}
        questionCount={questionCount}
        showInitialQuestions={showInitialQuestions}
        isLoading={isLoading}
        expanded={isChatExpanded}
        onInitialQuestionClick={handleInitialQuestion}
      />
      
      <InputArea 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
      />
      
      <InfoModal 
        show={showModal} 
        onClose={toggleModal}
      />
    </div>
  );
}
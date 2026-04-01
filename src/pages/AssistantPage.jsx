import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from '../components/ChatMessage'
import QuickActions from '../components/QuickActions'
import ChatInput from '../components/ChatInput'
import { useChat } from '../context/ChatContext'

export default function AssistantPage() {
  // const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)
  const {addMessage, clearMessages,messages,generating} = useChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, generating])

  

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-6 pb-16 chat-scroll">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg,index) => (
              <ChatMessage key={msg.id} message={msg} generating={generating} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="px-8 bg-transparent relative bottom-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <QuickActions model='general' onSelect={addMessage} />
        </div>
      </div>

      <div className="mx-auto w-full">
        <ChatInput onSend={addMessage} model='general' disabled={generating} />
      </div>
    </div>
  )
}

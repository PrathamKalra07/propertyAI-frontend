import React, { useState, useRef } from 'react'
import { Mic, Paperclip, Send } from 'lucide-react'
import { useChat } from '../context/ChatContext'

export default function ChatInput({ onSend, disabled,model='general' }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (!value.trim()) return
        onSend(value.trim(), model)
        setValue('')
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
        }
    }
}

  

  const handleInput = (e) => {
    setValue(e.target.value)
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
    }
  }

  return (
    <div className="border-t border-gray-200 bg-white px-6 pt-4 pb-3">
      {/* Input row */}
      <div className="flex items-end gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus-within:border-gray-400 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask about policies, report issues, or request assistance..."
          className="flex-1 resize-none border-none outline-none text-[14.5px] text-gray-700 placeholder-gray-400 bg-transparent leading-relaxed min-h-[24px] max-h-40"
          style={{ overflow: 'hidden' }}
          disabled={disabled}
        />
        <div className="flex items-center gap-2 mb-0.5">
          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <Mic size={18} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <Paperclip size={18} />
          </button>
        </div>
      </div>

      {/* Bottom row */}
      {/* <div className="flex items-center justify-between mt-2.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="text-yellow-500 text-sm">💡</span>
          <span>Powered by AI trained on 127 documents • Press Enter to send</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Shift + Enter for new line</span>
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${
              value.trim() && !disabled
                ? 'bg-gray-900 text-white hover:bg-gray-700 shadow-sm'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={15} />
          </button>
        </div>
      </div> */}
    </div>
  )
}

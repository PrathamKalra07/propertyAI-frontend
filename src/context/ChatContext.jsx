import React, { createContext, useState, useCallback } from 'react';
import { sendMessage,chatTicket } from '../api/ChatService';
import { v4 as uuid } from 'uuid';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState(
            [{
                id: "welcome",
                role: "assistant",
                content: `Hello! I'm your PropertyAI assistant, powered by advanced AI trained on all your property documents and policies. I'm here to help you with:

### 🏠 Property Management
- Lease agreements and terms  
- Property policies and regulations  
- Rental payment information  

### 🔧 Maintenance & Support
- Report issues and create tickets  
- Schedule repairs and inspections  
- Track maintenance requests  

### 📋 Document Intelligence
- Search through all property documents  
- Get instant answers with source references  
- Access policies, procedures, and agreements  

How can I assist you today?`
            }]
        );
        const [ticketMessage, setTicketMessage] = useState(
            [{
                id: "welcome",
                role: "assistant",
                content: `Hello! I'm your PropertyAI assistant, powered by advanced AI trained on all your property documents and policies. I'm here to help you with:

### 🏠 Property Management
- Lease agreements and terms  
- Property policies and regulations  
- Rental payment information  

### 🔧 Maintenance & Support
- Report issues and create tickets  
- Schedule repairs and inspections  
- Track maintenance requests  

### 📋 Document Intelligence
- Search through all property documents  
- Get instant answers with source references  
- Access policies, procedures, and agreements  

How can I assist you today?`
            }]
        );

    const [ticketChatId,setTicketChatId] = useState(uuid());
    const [isLoading, setIsLoading] = useState(false);
    const [generating,setIsGenerating] = useState(false);

    const addMessage = async (message,model) => {
        const userMessage =
            typeof message === "string"
                ? { id: Date.now(), role: "user", content: message }
                : message;

        const botId = Date.now() + 1;

        setMessages((prev) => [
            ...prev,
            userMessage,
            { id: botId, role: "assistant", content: "" }
        ]);

        setIsLoading(true);

        try {
            setIsGenerating(true);
            if(model == 'general'){
                await sendMessage(userMessage.value, (chunk) => {
                    console.log('generating : ',false);
                    setMessages((prev) =>
                        prev.map((msg) => {
                            return msg.id === botId
                            ? { ...msg, content: msg.content + chunk }
                            : msg
                        }
                        )
                    );
                });
            }else if(model == 'ticket'){
                const res = await chatTicket(userMessage.value,ticketChatId);
                setTicketMessage((prev) => [
                    ...prev,
                    userMessage,
                    { id: botId, role: "assistant", content: res }
                ]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsGenerating(false);
        }
    };
    const clearMessages = useCallback(() => {
        setMessages([]);
        setTicketMessage([]);
        setTicketChatId(uuid());
    }, []);

    const value = {
        messages,
        ticketMessage,
        isLoading,
        setIsLoading,
        addMessage,
        clearMessages,
        generating
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = React.useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within ChatProvider');
    }
    return context;
};
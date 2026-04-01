import React, { createContext, useState, useCallback, useContext } from 'react';
import { sendMessage, chatTicket } from '../api/ChatService';
import { v4 as uuid } from 'uuid';

const WELCOME_CONTENT = `Hello! I'm your PropertyAI assistant, powered by advanced AI trained on all your property documents and policies. I'm here to help you with:

### Property Management
- Lease agreements and terms  
- Property policies and regulations  
- Rental payment information  

### Maintenance and Support
- Report issues and create tickets  
- Schedule repairs and inspections  
- Track maintenance requests  

### Document Intelligence
- Search through all property documents  
- Get instant answers with source references  
- Access policies, procedures, and agreements  

How can I assist you today?`;

const WELCOME_MESSAGE = { id: 'welcome', role: 'assistant', content: WELCOME_CONTENT };

export const BOT_CONFIG = {
    general: {
        label: 'General Assistant',
        streaming: true,
        handler: async (content, _sessionId, onChunk) => {
            await sendMessage(content, onChunk);
        },
    },
    ticket: {
        label: 'Ticket Assistant',
        streaming: false,
        handler: async (content, sessionId, onChunk) => {
            const res = await chatTicket(content, sessionId);
            onChunk(res);
        },
    },
};

const makeBotState = () => ({
    messages: [WELCOME_MESSAGE],
    sessionId: uuid(),
});

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [bots, setBots] = useState(
        () => Object.fromEntries(Object.keys(BOT_CONFIG).map(k => [k, makeBotState()]))
    );
    const [generating, setGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // const addMessage = useCallback(async (content, botId) => {
    //     const config = BOT_CONFIG[botId];
    //     if (!config) throw new Error(`Unknown bot: ${botId}`);

    //     const userMessage = { id: Date.now(), role: 'user', content };
    //     const botMsgId = Date.now() + 1;

    //     setBots(prev => ({
    //         ...prev,
    //         [botId]: {
    //             ...prev[botId],
    //             messages: [
    //                 ...prev[botId].messages,
    //                 userMessage,
    //                 { id: botMsgId, role: 'assistant', content: '' },
    //             ],
    //         },
    //     }));

    //     setIsLoading(true);
    //     setGenerating(true);

    //     try {
    //         const sessionId = bots[botId].sessionId;

    //         await config.handler(content, sessionId, (chunk) => {
    //             setBots(prev => ({
    //                 ...prev,
    //                 [botId]: {
    //                     ...prev[botId],
    //                     messages: prev[botId].messages.map(msg =>
    //                         msg.id === botMsgId
    //                             ? { ...msg, content: msg.content + chunk }
    //                             : msg
    //                     ),
    //                 },
    //             }));
    //         });
    //     } catch (error) {
    //         console.error(`[ChatContext] addMessage error for bot "${botId}":`, error);
    //     } finally {
    //         setIsLoading(false);
    //         setGenerating(false);
    //     }
    // }, [bots]);

    const addMessage = useCallback(async (content, botId) => {
        const config = BOT_CONFIG[botId];
        if (!config) throw new Error(`Unknown bot: ${botId}`);

        const userMessage = { id: uuid(), role: 'user', value : content };
        const botMsgId = uuid();

        let sessionId;

        setBots(prev => {
            sessionId = prev[botId].sessionId;

            return {
                ...prev,
                [botId]: {
                    ...prev[botId],
                    messages: [
                        ...prev[botId].messages,
                        userMessage,
                        { id: botMsgId, role: 'assistant', content: '' },
                    ],
                },
            };
        });

        setIsLoading(true);
        setGenerating(true);

        try {
            await config.handler(content, sessionId, (chunk) => {
                setBots(prev => ({
                    ...prev,
                    [botId]: {
                        ...prev[botId],
                        messages: prev[botId].messages.map(msg =>
                            msg.id === botMsgId
                                ? { ...msg, content: (msg.content || '') + chunk }
                                : msg
                        ),
                    },
                }));
            });
        } catch (error) {
            console.error(`[ChatContext] addMessage error:`, error);
        } finally {
            setIsLoading(false);
            setGenerating(false);
        }
    }, []);

    const clearMessages = useCallback((botId) => {
        if (botId) {
            setBots(prev => ({ ...prev, [botId]: makeBotState() }));
        } else {
            setBots(() => Object.fromEntries(Object.keys(BOT_CONFIG).map(k => [k, makeBotState()])));
        }
    }, []);

    const getBot = useCallback((botId) => bots[botId] ?? makeBotState(), [bots]);

    return (
        <ChatContext.Provider value={{ getBot, addMessage, clearMessages, generating, isLoading }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used within ChatProvider');
    return context;
};
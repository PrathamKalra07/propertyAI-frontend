import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { sendMessage, chatTicket,chatLease, fetchTickets, fetchLeads, fetchDocuments } from '../api/ChatService';
import { v4 as uuid } from 'uuid';
import { cache } from 'react';
import { useAuth } from './AuthContext';

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
        handler: async (content, _sessionId, token,onChunk) => {
            await sendMessage(content, onChunk);
        },
    },
    ticket: {
        label: 'Ticket Assistant',
        streaming: false,
        handler: async (content, sessionId, token,onChunk) => {
            const res = await chatTicket(content, sessionId,token);
            onChunk(res);
        },
    },
    lease:{
        label: 'Lease Assistant',
        streaming: false,
        handler: async (content,sessionId,token,onChunk) =>{
            const res = await chatLease(content,sessionId,token);
            onChunk(res);
        }
    }
};

const makeBotState = () => ({
    messages: [WELCOME_MESSAGE],
    sessionId: uuid(),
});

const ChatContext = createContext();


export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [bots, setBots] = useState(
        () => Object.fromEntries(Object.keys(BOT_CONFIG).map(k => [k, makeBotState()]))
    );
    const [generating, setGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tickets,setTickets] = useState([]);
    const [leads,setLeads] = useState([]);
    const [documents,setDocuments] = useState([]);

    const cacheAllData = async ()=>{
        try{
            console.log('logged in userrrr : ',user);
            const ticketsData = await fetchTickets(user.access_token);
            const leadsData = await fetchLeads(user.access_token);
            const documentsData = await fetchDocuments(user.access_token);

            setTickets(ticketsData);
            setLeads(leadsData);
            setDocuments(documentsData);

        }catch(e){
            console.error('error : ',e);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!user?.access_token) return; 
        cacheAllData();
    }, [user]);

    const addMessage = useCallback(async (content, botId,token) => {
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
            await config.handler(content, sessionId, token, (chunk) => {
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
        <ChatContext.Provider value={{ getBot,tickets,leads,documents, addMessage, clearMessages, generating, isLoading }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used within ChatProvider');
    return context;
};
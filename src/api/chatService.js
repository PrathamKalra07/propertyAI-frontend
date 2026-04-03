import axios from "axios";

// export const sendMessage = async (content,onChunk) => {
//     if (!content) {
//         throw new Error("Message content is missing");
//     }
//     const response = await axios.post('http://localhost:8000/chat/stream', {
//         query: content ?? '',
//         chat_history: [
//             {
//                 role: "user",
//                 content: content ?? '',
//                 timestamp: new Date().toISOString()
//             }
//         ],
//         namespace: "default",
//         top_k: 8,
//         filters: {}
//     });

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder("utf-8");

//     let done = false;

//     while (!done) {
//         const { value, done: doneReading } = await reader.read();
//         done = doneReading;

//         const chunkValue = decoder.decode(value, { stream: true });

//         const lines = chunkValue.split("\n");

//         for (let line of lines) {
//             if (line.startsWith("data: ")) {
//                 const json = line.replace("data: ", "").trim();

//                 if (!json) continue;

//                 const parsed = JSON.parse(json);

//                 if (parsed.chunk) {
//                     onChunk(parsed.chunk);
//                 }

//                 if (parsed.done) {
//                     return;
//                 }
//             }
//         }
//     }
// }

//
// {
//   "query": "string",
//   "chat_history": [
//     {
//       "role": "string",
//       "content": "string",
//       "timestamp": "2026-03-31T05:35:34.772Z"
//     }
//   ],
//   "namespace": "default",
//   "top_k": 8,
//   "filters": {}
// }
export const sendMessage = async (content, onChunk) => {
    if (!content) {
        throw new Error("Message content is missing");
    }

    const response = await fetch('http://localhost:8000/chat/stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream' 
        },
        body: JSON.stringify({
            query: content,
            chat_history: [
                {
                    role: "user",
                    content: content,
                    timestamp: new Date().toISOString()
                }
            ],
            namespace: "default",
            top_k: 8,
            filters: {}
        })
    });

    if (!response.body) {
        throw new Error("No readable stream from server");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;
    let buffer = "";

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");

        for (let part of parts) {
            if (part.startsWith("data: ")) {
                const json = part.replace("data: ", "").trim();
                if (!json) continue;

                const parsed = JSON.parse(json);

                if (parsed.chunk) {
                    onChunk(parsed.chunk); 
                }
                
                if (parsed.done) {
                    return;
                }
            }
        }

        buffer = parts[parts.length - 1];
    }
};

export const chatTicket = async (content, conversationId,token)=>{
    try{
        
    const response = await fetch('http://localhost:8000/maintenance/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify(
            {
            "message": content,
            "conversation_id": conversationId,
            "tenant_name": "",
            "unit_number": "",
            "property_name": ""
            }
        )
    });

    if (!response.body) {
        throw new Error("No readable stream from server");
    }

    const res = await response.json();

    return res.response;

    
    }catch(error){
        console.error("Error in chatTicket:", error);
    }
}

export const chatLease = async (content, conversationId,token)=>{
    try{
        
    const response = await fetch('http://localhost:8000/leasing/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify(
            {
            "message": content,
            "conversation_id": conversationId
            }
        )
    });

    if (!response.body) {
        throw new Error("No readable stream from server");
    }

    const res = await response.json();

    return res.response;

    
    }catch(error){
        console.error("Error in chatTicket:", error);
    }
}

export const fetchTickets = async (token) =>{
    try{
        
    const response = await fetch('http://localhost:8000/tickets', {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    });

    if (!response.body) {
        throw new Error("No tickets found");
    }

    const res = await response.json();
    console.log("res : ",res);
    return res.tickets;

    
    }catch(error){
        console.error("Error in getting tickets:", error);
    }
}

export const fetchLeads = async (token) =>{
    try{
        
    const response = await fetch('http://localhost:8000/leads', {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    });

    if (!response.body) {
        throw new Error("No Leads found");
    }

    const res = await response.json();
    console.log("res : ",res);
    return res.leads;

    
    }catch(error){
        console.error("Error in getting tickets:", error);
    }
}

export const fetchDocuments = async (token) =>{
    try{
        
    const response = await fetch('http://localhost:8000/documents/list', {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    });

    if (!response.body) {
        throw new Error("No Documents found");
    }

    const res = await response.json();
    console.log("res : ",res);
    return res.documents;

    
    }catch(error){
        console.error("Error in getting tickets:", error);
    }
}

export const getMessage=()=>{

}

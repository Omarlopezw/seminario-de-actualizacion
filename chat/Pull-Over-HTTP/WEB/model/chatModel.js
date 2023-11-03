import { encryptMessage,decryptMessage } from "../utils/encrypting.js";

class ChatModel extends EventTarget
{
    constructor()
    {
        super();
        this.sharedKey = undefined;
        this.activeChat = undefined;
        this.sessionData = undefined;
        this.activeChatInterval = null;
    }
    init()
    {
        console.log('init setInterval');

        setInterval(() =>
        {
            this.getMessage(this.activeChat);
        }, 5000);

        setInterval(()=>
        {
            this.getchatProposals();
        },5000)

        this.activeChatInterval = setInterval(()=>
        {
            this.getActiveChats();
        },5000)
    }
    async getMessage(chatID)
    {
        let sessionData = this.getSessionData();

        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify(chatID), 
        };

        let request = await fetch( 'http://localhost:8080/getMessage',fetchData );

        let response = await request.json();

        for(let message of response)
        {
            const ivArray = new Uint8Array(Object.values(message.body['iv']));
            const dataArray = new Uint8Array(Object.values(message.body['data']));

            const ivBuffer = ivArray.buffer;
            const dataBuffer = dataArray.buffer;

            message.body = decryptMessage({ iv: ivBuffer, data: dataBuffer }, this.sharedKey)

            this.dispatchEvent(new CustomEvent('message',{detail: {message}}));
        }

        return response;
    }
    async sendMessage(message)
    {
        let sessionData = this.getSessionData();
        
        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify({message: await encryptMessage(message,this.sharedKey),chatID: this.activeChat}), 
        };

        let request = await fetch( 'http://localhost:8080/sendMessage',fetchData );

        let response = await request.json();
        
        return response;
    }
    async getchatProposals()
    {
        let sessionData = this.getSessionData();

        let fetchData = 
        { 
            method: 'GET', 
            headers: 
            {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            }
        }

        let request = await fetch( 'http://localhost:8080/getchatProposals',fetchData );

        
        let response = await request.json();

        if (response.length !== 0)
        {
            this.dispatchEvent(new CustomEvent('proposal',{detail: response}));
        }
        
        return response;
    }
    async confirmChatProposal(chatProposalResponse)
    {
        let sessionData = this.getSessionData();

        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify(chatProposalResponse), 
        };

        let request = await fetch( 'http://localhost:8080/confirmChatProposal',fetchData );
        

        let response = await request.json();
        
        return response;
    }
    async cancelChatProposal(chatProposalResponse)
    {
        alert('canceled in model')

        let sessionData = this.getSessionData();

        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify(chatProposalResponse), 
        };

        let request = await fetch( 'http://localhost:8080/cancelChatProposal',fetchData );

        let response = await request.json();
        
        return response;
    }
    async getOnlineUsers()
    {
        this.sessionData = this.getDataInLocalStorage('sessionData');
        let userID = this.sessionData.userID;

        let fetchData = 
        { 
            method: 'GET', 
            headers: 
            {
                'Content-Type': 'application/json',
                'userid': userID,
            }
        }

        let request = await fetch( 'http://localhost:8080/getOnlineUsers',fetchData );

        let response = await request.json();

        return response;
    }
    async getActiveChats()
    {
        let sessionData = this.getSessionData();

        let fetchData = 
        { 
            method: 'GET', 
            headers: 
            {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            }
        }

        let request = await fetch( 'http://localhost:8080/getActiveChats',fetchData );

        let response = await request.json();

        if (response[0] && response[0].id) 
        {
            this.activeChat = response[0].id;
            await this.getSharedKey();
            this.dispatchEvent(new CustomEvent('activeChat',{detail: response[0].id}));

            clearInterval(this.activeChatInterval);
        } 
        else 
        {
            this.activeChat = '';
        }

        return response;
    }
    async getSharedKey()
    {
        let fetchData = 
        { 
            method: 'GET', 
            headers: 
            {
                'Content-Type': 'application/json',
            }
        }

        let request = await fetch( 'http://localhost:8080/getSharedKey',fetchData );

        let response = await request.json();

        this.sharedKey = response;

        return response;
    }
    async proposeChat(userTarget)
    {
        let sessionData = this.getSessionData();
        let data  = {userTarget: userTarget};
        alert('origin: ' + sessionData.userID + ' destino ' + userTarget);

        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify(data), 
        };
        

        let request = await fetch( 'http://localhost:8080/newchatProposal',fetchData );

        let response = await request.json();

        return response;
    }
    getSessionData()
    {
        // Para recuperar el objeto del localStorage
        const sessionData = localStorage.getItem('sessionData');

        // Convierte la cadena JSON de nuevo a un objeto JavaScript
        const data = JSON.parse(sessionData);

        return data;
    }
    async logout(userID)
    {
        let fetchData = 
        { 
            method: 'POST', 
            body: JSON.stringify( userID ) 
        }

        let request = await fetch( 'http://localhost:8080/logout',fetchData );

        let response = await request.json();

        return response;

    }
    saveInLocalStorage(key,data)
    {
        localStorage.setItem(key, JSON.stringify(data));
    }
    getDataInLocalStorage(key)
    {
        // Para recuperar el objeto del localStorage
        const sessionData = localStorage.getItem(key);

        // Convierte la cadena JSON de nuevo a un objeto JavaScript
        const data = JSON.parse(sessionData);

        return data;
    }
}

export {ChatModel};
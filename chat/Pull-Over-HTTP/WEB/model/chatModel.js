
class ChatModel extends EventTarget
{
    constructor()
    {
        super();
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
        return response;
    }
    async sendMessage(message,chatID)
    {
        // alert(`Mensaje ${message} + chat id ${chatID}`);
        let sessionData = this.getSessionData();
        
        let fetchData = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userid': sessionData.userID,
            },
            body: JSON.stringify({message: message,chatID: chatID}), 
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
        let fetchData = 
        { 
            method: 'GET', 
            headers: 
            {
                'Content-Type': 'application/json',
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

}

export {ChatModel};
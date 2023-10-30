const getCurrentDate = require("./Utils/Date.js");

class Chat
{
    constructor()
    {
        this.onlineUserList = [];
        this.chatProposals = [];
        this.chatsMessages = new Map();

    }
    connectUser(user)
    {
        this.onlineUserList.push(user);
    }
    getOnlineUser()
    {
        return this.onlineUserList;
    }
    newChatProposal(origin,userTarget)
    {
        if((origin && userTarget) !== undefined)
        {
            let chatProposal = {id:this.chatProposals.length+1 ,origin: origin,userTarget: userTarget,state: 'pending'};
            this.chatProposals.push(chatProposal)
        }
    }
    sendMessage(origin,chatReference)
    {
        let obj = {response: false};
        if((origin !== undefined) && chatReference.message != '')
        {
            let searchedObj = this.chatProposals.find(chat => chat.id == chatReference.chatID);
            let targetID = '';
            searchedObj.userTarget == origin? targetID = searchedObj.origin : targetID = searchedObj.userTarget;

            let chatMessage = 
            {
                id: this.chatsMessages.size+1,
                originID: origin,
                targetID: targetID,
                body: chatReference.message,
                state: 'sended',
                timeStandSend: getCurrentDate(),
                timeStandReceived: undefined
            }
            if(this.chatsMessages.size == 0)
            {
                this.chatsMessages.set(chatReference.chatID,new Map());
            }
            const chatMessagesMap = this.chatsMessages.get(chatReference.chatID);

            if (chatMessagesMap) {
            let messagesArray = chatMessagesMap.get(targetID) || [];
            messagesArray.push(chatMessage)
            chatMessagesMap.set(targetID, messagesArray);
            obj['response'] = true;
            obj['messages'] = [messagesArray[messagesArray.length-1]];
            } else {
                console.log('no existe id')
            }
        }
        return obj;
    }
    getMessage(origin,chatID)
    {
        let messages = [];
        if(origin !== undefined)
        {
            if (this.chatsMessages.size === 0) 
            {
                console.log('El mapa está vacío.');
            } 
            else 
            {
                const chatMessagesMap = this.chatsMessages.get(chatID);
                
                if (chatMessagesMap) 
                {
                    let messagesArray = chatMessagesMap.get(origin) || [];

                    for (const message of messagesArray) 
                    {
                        message.timeStandReceived = getCurrentDate();
                    }
                    messages = messagesArray.filter((objMessage) => (objMessage.targetID == origin && objMessage.state == 'sended'));
                    for (const message of messagesArray) 
                    {
                        message.state = 'received';
                    }
                } else {
                    console.log('No se encontró un chat con el ID especificado.');
                }
            }
        }

        return messages;
    }
    getchatProposals(origin)
    {
        return this.chatProposals.filter((chat) => (chat.state == 'pending' && chat.userTarget == origin ));
    }
    getActiveChats(origin)
    {

        return this.chatProposals.filter((chat) => (chat.state == 'active' && (chat.userTarget == origin || chat.origin  == origin) ));
    }
    confirmChatProposal(user,proposalChatResponse)
    {
        if((user && proposalChatResponse) !== undefined)
        {
            this.chatProposals.forEach((chat) => {
                if (chat.userTarget == user) 
                {
                    if(chat.state == 'pending' && chat.id == proposalChatResponse['proposalChatID'])
                    {
                        chat.state = 'active';
                        // return chat;
                    }
                }
            });
        }
        // return null;
    }
    cancelChatProposal(user,proposalChatResponse)
    {
        if((user && proposalChatResponse) !== undefined)
        {
            this.chatProposals.forEach((chat) => {
                if (chat.userTarget == user) 
                {
                    if(chat.state == 'pending' && chat.id == proposalChatResponse['proposalChatID'])
                    {
                        chat.state = 'canceled';
                        // return chat;
                    }
                }
            });
        }
        // return null;
    }
    disconnectUser(user)
    {
        // Busca el índice del usuario en el array.
        let index = this.onlineUserList.findIndex(connectedUser => connectedUser == user);

        if (index !== -1) 
        {
        // Si se encontró al usuario en el array, elimínalo.
        this.onlineUserList.splice(index, 1);
        }
    }
    release()
    {
        this.chatProposals = [];
        this.chatsMessages.clear();
    }

}

module.exports = {Chat};
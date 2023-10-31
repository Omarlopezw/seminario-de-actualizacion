import { encryptMessage,decryptMessage } from "../utils/encrypting.js";

class ChatController
{
    constructor(view,model)
    {
        this.innerView = view;
        this.innerModel = model;
        this.activeChat = undefined;
        this.encryptedMessage = '';
        this.proposalsIntervalID = null;
        this.sharedKey = '';
    }
    askForSendedMessage()
    {
        // let response = this.innerModel.askForSendedMessage(this.activeChat.id);

        // if()
        // {

        // }
    }
    async getMessage()
    {
        let intervalId = null; 
        let sharedKey = await this.getDataInLocalStorage('sharedKey');
            setInterval(() => {
                if(this.activeChat != undefined )
                {
                    this.innerModel.getMessage(this.activeChat.id).then
                    ((messagesArray) => {
                        
                        console.log(messagesArray);
                        if (messagesArray.length !== 0) 
                        {
                            for(let message of messagesArray)
                            {
                                const messageContainer = document.createElement("li");
                                messageContainer.classList.add('received');
                                
                                let timeStandReceived = message.timeStandReceived;

                                const ivArray = new Uint8Array(Object.values(message.body['iv']));
                                const dataArray = new Uint8Array(Object.values(message.body['data']));

                                const ivBuffer = ivArray.buffer;
                                const dataBuffer = dataArray.buffer;
                                // decryptMessage({iv:new Uint8Array(Object.values(message.body['iv'])).buffer,data: new Uint8Array(Object.values(message.body['data'])).buffer},sharedKey).then((message) => 
                                decryptMessage({ iv: ivBuffer, data: dataBuffer }, sharedKey).then((message) => 
                                {
                                    messageContainer.textContent = `Friend: ${message}`;

                                    const messageHour = document.createElement("span");
                                    messageHour.classList.add('messageTime');
                                    messageHour.innerText = `${timeStandReceived}`;
    
                                    messageContainer.appendChild(messageHour);
                                    this.innerView.chatList.appendChild(messageContainer);
                                });
                            }
                            
                        }
                    })
                }
                else
                {
                    console.log('Ningun chat activo');
                }
            }, 5000);
    }
    async sendMessage(message)
{
        // let sharedKey = this.getDataInLocalStorage('sharedKey');
        this.sharedKey = await this.getDataInLocalStorage('sharedKey');
        if(message != '')
        {
            let encryptedMessage = await encryptMessage(message,this.sharedKey);
            let response = await this.innerModel.sendMessage(encryptedMessage,this.activeChat.id);
            if(response['response'])
            {
                for(let chatMessage of response['messages'])
                {
                    const messageContainer = document.createElement("li");
                    messageContainer.classList.add('sended');
                    this.encryptedMessage = encryptedMessage;
                    decryptMessage(encryptedMessage,this.sharedKey).then((message) => 
                    {
                        messageContainer.textContent =`You: ${message}`;
    
                        const messageTilde = document.createElement("span");
                        messageTilde.innerText = '✔';
                        messageTilde.classList.add('messaging');
        
                        const messageHour = document.createElement("span");
                        messageHour.classList.add('messageTime');
                        messageHour.innerText = `${chatMessage.timeStandSend}`;
                        
                        messageContainer.appendChild(messageTilde);
                        messageContainer.appendChild(messageHour);
                        this.innerView.chatList.appendChild(messageContainer);
                    })
                }
            }
        }
        else
        {
            alert('Mensaje vacio');
        }

    }
    getActiveChats()
    {
        let intervalId = null; 
        intervalId = setInterval(() => {this.innerModel.getActiveChats().then
            ((activeChats) => {
                
                console.log('activeChats' + activeChats);
                if (activeChats.length !== 0) 
                {
                    this.activeChat = activeChats[0];
                    clearInterval(intervalId);
                    this.innerModel.getSharedKey().then((sharedKey)=>{this.saveInLocalStorage('sharedKey',sharedKey);});
                    this.innerView.shadowRoot.appendChild(this.innerView.chatContainer);
                }
            })
        }, 5000);

    }
    async getOnlineUsers()
    {
        let sessionData = this.getDataInLocalStorage('sessionData');
        let userID = sessionData.userID;
        // Elimina todos los elementos de la lista OnlineUsers (ul) existentes.
        while (this.innerView.OnlineUsers.firstChild) 
        {
            this.innerView.OnlineUsers.removeChild(this.innerView.OnlineUsers.firstChild);
        }
        let users = await this.innerModel.getOnlineUsers();
        for (const user of users) 
        {
            if(user !== userID)
            {
                const onlineUser = document.createElement('li');
                onlineUser.textContent = user;
                console.log('USER: ' + user);
                this.innerView.OnlineUsers.appendChild(onlineUser);
            }
        }
    }
    async onLogoutButtonClick()
    {
        this.innerView.shadowRoot.removeChild(this.innerView.chatContainer);

        let sessionData = this.getDataInLocalStorage('sessionData');
        const response = await this.innerModel.logout(sessionData.userID);

        if(response.message)
        {
            this.innerView.dispatchEvent(new CustomEvent('logout', { detail:response }))
        }
        else
        {
            alert('error: incorrect logout')
        }
    }

    proposeChat(userTarget)
    {
        this.innerModel.proposeChat(userTarget);
    }
    async getchatProposals()
    {
        // let intervalId = null; 
        this.proposalsIntervalID = setInterval(() => {this.innerModel.getchatProposals().then
            ((chatProposals) => {
                
                console.log(chatProposals);
                if (chatProposals.length !== 0) 
                {
                    let chatProposalResponse = {};

                    this.innerView.question.setOptions({ titleText:`Usuario '${chatProposals[0].origin}' te propone chat`, 
                    questionText:'Aceptar o cancelar propuesta de chat', confirmText:'Confirm', cancelText:'Cancel'});

                    this.innerView.modal.setContent(this.innerView.question);
                
                    this.innerView.modal.open();

                    this.innerView.question.getResponse().then
                    ((response)=>
                    {
                        if(response == true)
                        {
                            alert('response confirmChatProposal' + response);
                            clearInterval(this.proposalsIntervalID);
                            chatProposalResponse['response'] = true;
                            chatProposalResponse['proposalChatID'] = chatProposals[0].id;
                            this.confirmChatProposal(chatProposalResponse);
                        }
                        else
                        {
                            alert('response cancelChatProposal' + response);
                            chatProposalResponse['response'] = false;
                            chatProposalResponse['proposalChatID'] = chatProposals[0].id;
                            this.cancelChatProposal(chatProposalResponse);
                        }

                        this.innerView.modal.close();
                    })
                }
                else
                {
                    console.log('sin propuestas de chat');
                }
            })
        }, 5000);
    }
    async confirmChatProposal(chatProposalResponse)
    {
        let response = await this.innerModel.confirmChatProposal(chatProposalResponse);
        return response;
    }
    async cancelChatProposal(chatProposalResponse)
    {
        let response = await this.innerModel.cancelChatProposal(chatProposalResponse);
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

export {ChatController};
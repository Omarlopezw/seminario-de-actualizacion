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
        
        model.init();
        model.addEventListener('message',(event)=> { this.onGetMessage(event) });
    }
    askForSendedMessage()
    {
        // let response = this.innerModel.askForSendedMessage(this.activeChat.id);

        // if()
        // {

        // }
    }
/**  
 *  @brief recibe mensaje desencriptado para delegarlo en la vista...
 * 
 * @param {Promise<object>} event {detail.message}
 * 
 * @return {void}
 **/
async onGetMessage(event)
{
    let message = await event.detail.message;

    this.innerView.addReplyMessageOnChat(message);
}
/**  
 *  @brief envia mensaje...
 * 
 * @param {string} message
 * 
 * @return {Promise<object>}
 **/
async onSendMessage(message)
{
    let response = await this.innerModel.sendMessage(message);

    return response;
}

    getActiveChats()
    {
        let intervalId = null; 
        intervalId = setInterval(() => {this.innerModel.getActiveChats().then
            ((activeChats) => {
                
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
                            clearInterval(this.proposalsIntervalID);
                            chatProposalResponse['response'] = true;
                            chatProposalResponse['proposalChatID'] = chatProposals[0].id;
                            this.confirmChatProposal(chatProposalResponse);
                        }
                        else
                        {
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
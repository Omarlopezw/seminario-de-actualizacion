class ChatController
{
    constructor(view,model)
    {
        this.innerView = view;
        this.innerModel = model;
        this.activeChat = undefined;
        
        model.init();
        model.addEventListener('message',(event)=> { this.onGetMessage(event) });
        model.addEventListener('proposal',(event)=> { this.onGetChatProposal(event) });
        model.addEventListener('activeChat',(event)=> { this.onGetActiveChats(event) });
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
/**
 *  @brief obtiene los chats activos...
 * 
 * @param {Promise<object>} event
 * 
 * @return {void} 
 **/
    onGetActiveChats(event)
    {
        this.innerView.showActiveChat();
    }
/**
 *  @brief obtiene los usuarios en linea...
 * 
 * @return {Promise<Array<userID>>} 
 **/
    async onGetOnlineUsers()
    {
        let users = await this.innerModel.getOnlineUsers();

        return users;
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
/**
 *  @brief obtiene las propuestas de chat...
 * 
 * @param {object} event - Objeto con array de propuestas de chat.
 * 
 * @return {void}
 **/
    async onGetChatProposal(event)
    {
        let proposals = event.detail
        
        this.innerView.showModalWindow(proposals);
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
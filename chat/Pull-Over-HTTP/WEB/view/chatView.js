import { ChatController } from '../controller/chatController.js';
import { UserLoginController } from '../controller/userLoginController.js'
import { getChatStyle } from './style/styleForWCChatview.js';
import { WCModalView } from './WCModalView.js';
import { WCQuestionDialog } from './WCQuestionDialog.js';
class ChatView extends HTMLElement 
{
    constructor(model) 
    {
        super();
        this.attachShadow( {mode: 'open'});
        this.selectedUser = '';

        //Modal window

        this.modal = new WCModalView();
        this.question = new WCQuestionDialog();

        this.sidebar = document.createElement('div');
        this.sidebar.classList.add('sidebar');

        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';

        this.dropdown = document.createElement('div');
        this.dropdown.classList.add('dropdown');

        this.onlineUsersSpan = document.createElement('span');
        this.onlineUsersSpan.classList.add('onlineusers-span');
        this.onlineUsersSpan.textContent = 'Online users';

        this.dropdownContent = document.createElement('div');
        this.dropdownContent.classList.add('dropdown-content');

        this.OnlineUsers = document.createElement('ul');

        this.chatProposalBtn = document.createElement('button');
        this.chatProposalBtn.classList.add('proposal-btn');
        this.chatProposalBtn.innerText = 'Propose chat: ';

        this.logoutButton = document.createElement('button');
        this.logoutButton.classList.add('logout-button');
        this.logoutButton.innerText = 'Logout';

        //Controller
        this.innerController = new ChatController(this,model);
        this.innerController.askForSendedMessage();

        //ChatBOX

        this.chatContainer = document.createElement('div');
        this.chatContainer.classList.add('chat-container');

        this.menu = document.createElement('div');
        this.menu.classList.add('menu');

        this.backButton = document.createElement('div');
        this.backButton.classList.add('back');

        this.backIcon = document.createElement('i');
        this.backIcon.classList.add('fa-solid', 'fa-chevron-left');

        this.backImage = document.createElement('img');
        this.backImage.src = 'https://i.imgur.com/DY6gND0.png';

        this.backImage.setAttribute('draggable', 'false');

        this.name = document.createElement('div');
        this.name.classList.add('name');
        this.name.textContent = 'Alex';

        this.last = document.createElement('div');
        this.last.classList.add('last');
        this.last.textContent = '18:09';

        this.chatList = document.createElement('ol');
        this.chatList.classList.add('chat');

        this.textInput = document.createElement('input');
        this.textInput.classList.add('messageInput');
        this.textInput.setAttribute('type', 'text');
        this.textInput.setAttribute('placeholder', 'Type here!');

        this.emojis = document.createElement('div');
        this.emojis.classList.add('emojis');

        this.sendMessageBtn = document.createElement('button');
        this.sendMessageBtn.classList.add('send-message-btn');

        let style = document.createElement('style');
        style.innerText = getChatStyle();

        this.shadowRoot.appendChild(style);

    }
    connectedCallback()
    {
        this.shadowRoot.appendChild(this.sidebar);
        this.sidebar.appendChild(this.dropdown);
        this.dropdown.appendChild(this.dropdownContent);
        this.dropdown.appendChild(this.onlineUsersSpan);
        this.dropdownContent.appendChild(this.OnlineUsers);
        this.dropdownContent.appendChild(this.chatProposalBtn);
        this.sidebar.appendChild(this.logoutButton);
        this.chatContainer.appendChild(this.menu);
        this.chatContainer.appendChild(this.chatList);
        this.chatContainer.appendChild(this.textInput);
        this.chatContainer.appendChild(this.emojis);
        this.chatContainer.appendChild(this.sendMessageBtn);
        this.menu.appendChild(this.backButton);
        this.menu.appendChild(this.name);
        this.menu.appendChild(this.last);
        this.backButton.appendChild(this.backIcon);
        this.backButton.appendChild(this.backImage);
        
        let users = this.innerController.onGetOnlineUsers();
        this.showOnlineUsers(users);
        
        this.chatProposalBtn.onclick = (event) =>
        {
            this.innerController.proposeChat(this.selectedUser.textContent);
            this.selectedUser.classList.remove('selectedUser');
        }
        this.OnlineUsers.onclick = (event) =>
        {
            if (event.target.tagName === 'LI') 
            {
                if(this.selectedUser != '')
                {
                    this.selectedUser.classList.remove('selectedUser');
                }
                this.selectedUser = event.target;
                this.selectedUser.classList.add('selectedUser');
            }
        }

        this.sendMessageBtn.onclick = (event) =>
        {
            this.sendMessage();
        }

        this.textInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') 
            {
                this.sendMessage();
            }
        })
        

        this.logoutButton.onclick = (event) =>
        {
            this.innerController.onLogoutButtonClick();
        }

    }

/**  
 *  @brief escribe mensaje de respuesta en el chat...
 * 
 * @param {Promise<object>} replyMessage {message}
 * 
 * @return {void}
**/
    async addReplyMessageOnChat(replyMessage)
    {
        let message = await replyMessage;

        const messageContainer = document.createElement("li");
        messageContainer.classList.add('received');

        messageContainer.textContent = `Friend: ${ await message.body}`;

        const messageHour = document.createElement("span");
        messageHour.classList.add('messageTime');
        messageHour.innerText = `${message.timeStandReceived}`;

        messageContainer.appendChild(messageHour);
        this.chatList.appendChild(messageContainer);
    }
/**  
 *  @brief envia mensaje...
 *  
 **/
    async sendMessage() 
    {
        if (this.textInput.value != '') 
        {
            let objMessage = this.innerController.onSendMessage(this.textInput.value);

            this.addMessageSentOnChat(this.textInput.value, objMessage);

            this.textInput.value = '';
        } 
        else 
        {
            alert('Mensaje vacío');
        }
    }  
/**
 * @brief Escribe el mensaje enviado en el chat.
 * 
 * @param {string} messageSent - El mensaje que se envió.
 * @param {Promise<object>} objMessage - Un objeto Promise que representa el mensaje con demas atributos.
 * 
 * @return {void}
 */
    async addMessageSentOnChat(messageSent,objMessage)
    {
        let messages = await objMessage;

        const messageContainer = document.createElement("li");
        messageContainer.classList.add('sended');
        messageContainer.textContent =`You: ${messageSent}`;

        const messageTilde = document.createElement("span");
        messageTilde.innerText = '✔';
        messageTilde.classList.add('messaging');

        const messageHour = document.createElement("span");
        messageHour.classList.add('messageTime');
        messageHour.innerText = `${messages['messages'][0].timeStandSend}`;
        
        messageContainer.appendChild(messageTilde);
        messageContainer.appendChild(messageHour);
        this.chatList.appendChild(messageContainer);
    }
/**
 * @brief Muestra la ventana modal cuando hay una propuesta...
 * 
 * @param {object} proposal - Objeto con array de propuestas de chat.
 * 
 * @return {void}
 */
    showModalWindow(proposals)
    {
        let chatProposalResponse = {};

        this.question.setOptions({ titleText:`Usuario '${proposals[0].origin}' te propone chat`, 
        questionText:'Aceptar o cancelar propuesta de chat', confirmText:'Confirm', cancelText:'Cancel'});

        this.modal.setContent(this.question);
    
        this.modal.open();

        this.question.getResponse().then
        ((response)=>
        {
            if(response == true)
            {
                chatProposalResponse['response'] = true;
                chatProposalResponse['proposalChatID'] = proposals[0].id;
                this.innerController.confirmChatProposal(chatProposalResponse);
            }
            else
            {
                chatProposalResponse['response'] = false;
                chatProposalResponse['proposalChatID'] = proposals[0].id;
                this.innerController.cancelChatProposal(chatProposalResponse);
            }

            this.modal.close();
        })

    }
    async showOnlineUsers(users)
    {
        let onlineUsers = await users;

        while (this.OnlineUsers.firstChild) 
        {
            this.OnlineUsers.removeChild(this.OnlineUsers.firstChild);
        }
        for (const user of onlineUsers) 
        {
            // if(user !== userID)
            // {
                const onlineUser = document.createElement('li');
                onlineUser.textContent = user;
                this.OnlineUsers.appendChild(onlineUser);
            // }
        }
    }
    showActiveChat()
    {
        this.shadowRoot.appendChild(this.chatContainer);
    }
}

// Registrar el componente personalizado para el mazo de 40 cartas
customElements.define('chat-view', ChatView);

export {ChatView};
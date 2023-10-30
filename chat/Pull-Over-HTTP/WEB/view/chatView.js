import { ChatController } from '../controller/chatController.js';
import { UserLoginController } from '../controller/userLoginController.js'
import { getChatStyle } from './style/styleForWCChatview.js';
class ChatView extends HTMLElement 
{
    constructor(model) 
    {
        super();
        this.attachShadow( {mode: 'open'});
        this.selectedUser = '';

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

        this.innerController = new ChatController(this,model);
        this.innerController.getActiveChats();
        this.innerController.getMessage();
        this.innerController.getchatProposals();
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

        //Chat propose
        this.chatProposalConteiner = document.createElement('div');
        this.labelChatProposal = document.createElement('label');
        this.confirmButton = document.createElement('button');
        this.confirmButton.innerText = 'Confirmar propuesta de chat';
        this.cancelButton = document.createElement('button');
        this.cancelButton.innerText = 'Cancelar propuesta de chat';


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
        // this.shadowRoot.appendChild(this.chatContainer)
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
        this.chatProposalConteiner.appendChild(this.labelChatProposal);
        this.chatProposalConteiner.appendChild(this.confirmButton);
        this.chatProposalConteiner.appendChild(this.cancelButton);
        
        this.innerController.getOnlineUsers();
        
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
            this.innerController.sendMessage(this.textInput.value);
            this.textInput.value = '';
        }

        this.textInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') 
            {
                this.innerController.sendMessage(this.textInput.value);
                this.textInput.value = '';
            }
        })
        

        this.logoutButton.onclick = (event) =>
        {
            this.innerController.onLogoutButtonClick();
        }

    }
}

// Registrar el componente personalizado para el mazo de 40 cartas
customElements.define('chat-view', ChatView);

export {ChatView};
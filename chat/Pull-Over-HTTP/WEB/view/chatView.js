import { ChatController } from '../controller/chatController.js';
import { UserLoginController } from '../controller/userLoginController.js'


class ChatView extends HTMLElement 
{
    constructor(model) 
    {
        super();
        this.attachShadow( {mode: 'open'});
        this.selectedUser = '';

        this.mainTitle = document.createElement('h1');
        this.mainTitle.innerText = 'Chat de Usuarios Conectados';

        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';

        this.OnlineUsers = document.createElement('ul');
        this.OnlineUsers.innerText = 'Usuarios en lìnea: ';

        this.chatProposalBtn = document.createElement('button');
        this.chatProposalBtn.innerText = 'Proponer chat: ';

        this.logoutButton = document.createElement('button');
        this.logoutButton.innerText = 'Logout';

        this.newLine = document.createElement('br');

        this.innerController = new ChatController(this,model);
        this.innerController.getActiveChats();
        this.innerController.getMessage();
        this.innerController.getchatProposals();

        //ChatBOX
        this.chatContainer = document.createElement('div');
        this.chatContainer.classList.add('chat-container');
        this.chatScreen = document.createElement('div');
        this.chatScreen.classList.add('chat-screen');
        this.chatBox = document.createElement('input');
        this.chatBox.type = 'text';
        this.sendMessageBtn = document.createElement('button');
        this.sendMessageBtn.innerText = 'Enviar mensaje';
        this.sendMessageBtn.classList.add('send-message-btn');

        //Chat propose
        this.chatProposalConteiner = document.createElement('div');
        this.labelChatProposal = document.createElement('label');
        this.confirmButton = document.createElement('button');
        this.confirmButton.innerText = 'Confirmar propuesta de chat';
        this.cancelButton = document.createElement('button');
        this.cancelButton.innerText = 'Cancelar propuesta de chat';

        let style = document.createElement('style');
        style.innerText = `.selectedUser
        {
            background-color: red;
        }
        .chat-container {
            width: 300px;
            border: 1px solid #ccc;
            padding: 10px;
            }
            
            .chat-screen {
            height: 200px;
            overflow-y: scroll;
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            }
            
            input[type="text"] {
            width: 80%;
            padding: 5px;
            margin-right: 10px;
            }
            
            .send-message-btn {
            background-color: #0074d9;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            }
            .message
            {
                position: relative;
                border: 2px solid #0074D9; /* Establece un borde azul de 2 píxeles */
                background-color: #E5F4FE; /* Establece un fondo azul claro */
                padding: 10px; /* Agrega relleno alrededor del mensaje */
                margin: 10px 0; /* Agrega un margen superior e inferior */
            }
                
            .sended 
            {
                position: absolute;
                right: 0; /* Coloca la tilde al final a la derecha */
                top: 0; /* Ajusta la posición vertical según tus necesidades */
                color: #009900; /* Cambia el color a tu preferencia */
                font-size: 20px; /* Ajusta el tamaño de la fuente según tus necesidades */
            }
            .messageTime 
            {
                position: absolute;
                right: 0; /* Coloca la tilde al final a la derecha */
                bottom: 0; /* Ajusta la posición vertical según tus necesidades */
                font-size: 12px; /* Ajusta el tamaño de la fuente según tus necesidades */
            }
            `
        this.shadowRoot.appendChild(style);

    }
    connectedCallback()
    {
        this.shadowRoot.appendChild(this.mainTitle);
        this.shadowRoot.appendChild(this.OnlineUsers);
        this.shadowRoot.appendChild(this.chatProposalBtn);
        this.shadowRoot.appendChild(this.newLine);
        this.shadowRoot.appendChild(this.logoutButton);
        this.chatContainer.appendChild(this.chatScreen);
        this.chatContainer.appendChild(this.chatBox);
        this.chatContainer.appendChild(this.sendMessageBtn);
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
            this.innerController.sendMessage(this.chatBox.value);
            this.chatBox.value = '';
        }

        this.logoutButton.onclick = (event) =>
        {
            this.innerController.onLogoutButtonClick();
        }

    }
}

// Registrar el componente personalizado para el mazo de 40 cartas
customElements.define('chat-view', ChatView);

export {ChatView};
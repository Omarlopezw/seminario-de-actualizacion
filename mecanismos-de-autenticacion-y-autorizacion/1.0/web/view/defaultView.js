import { DefaultController } from '../controller/defaultController.js'


class DefaultView extends HTMLElement
{
    constructor(model)
    {
        super();

        this.mainTitle = document.createElement('h1');
        this.mainTitle.innerText = 'This is a default view';

        this.getDataButton = document.createElement('button');
        this.getDataButton.innerText = 'get my data';

        this.logoutButton = document.createElement('button');
        this.logoutButton.innerText = 'logout';

        this.innerController = new DefaultController(this,model);


    }

    connectedCallback()
    {
        this.appendChild(this.mainTitle);
        this.appendChild(this.getDataButton);
        this.appendChild(this.logoutButton);

        this.getDataButton.onclick = (event)=>{this.innerController.getUserData()}
        this.logoutButton.onclick = (event)=>{this.innerController.onLogoutButtonClick()}

    }

    disconnectedCallback()
    {

    }
}

customElements.define('x-default-view', DefaultView );


export { DefaultView };
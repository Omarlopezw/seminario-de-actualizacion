import { createElement } from "../utils/createElement.js"

class WCModalView extends HTMLElement
{
	#onouterclick(event)
	{
		if (event.target == this) 
		{
		    this.close();
		}
	}

	#_innerContent = undefined;

	constructor()
	{
		super();

		this.classList.add('w3-modal');
		this.style = 'display:block';
		this.contentChild = createElement('div', {class:'w3-modal-content w3-card-4 w3-animate-top'});
		this.appendChild(this.contentChild);
	}

	connectedCallback()
	{
		// this.addEventListener('click', this.#onouterclick.bind(this) );
	}

	disconnectedCallback()
	{
		// this.removeEventListener('click', this.#onouterclick );
	}

	setContent( innerContentElement )
	{
		if ( innerContentElement instanceof HTMLElement )
		{
			this.#_innerContent = innerContentElement;
			this.contentChild.innerHTML = '';
			this.contentChild.appendChild(innerContentElement);
		}
	}

	getContent()
	{
		return this.#_innerContent;
	}

	open()
	{
		if ( !document.body.contains(this) )
		{
			document.body.appendChild(this);
		}
	}

	close()
	{
		if ( document.body.contains(this) )
		{
			document.body.removeChild(this);
		}
	}
}

customElements.define('x-modal-view', WCModalView );

export { WCModalView };
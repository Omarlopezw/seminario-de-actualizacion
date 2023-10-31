function createElement( name, options = {}) 
{
    let element = undefined;

    if ( name != null || name != undefined )
    {
        element = document.createElement(name);
    }

    for (const key in options)
    {
        if (options.hasOwnProperty(key)) 
        {
            if (key === 'textContent' || key === 'innerText')
            {
            element.textContent = options[key];
            }
            else
            {
            element.setAttribute(key, options[key]);
            }
        }
    }

    return element;
}

export {createElement};
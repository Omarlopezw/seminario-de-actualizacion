


let main = function()
{
    let model = new ChatModel();
    let view = new ChatView(model);
    document.body.appendChild(view);
}
window.onload = main;
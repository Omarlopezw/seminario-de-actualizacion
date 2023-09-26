const { Server } = require("./server/server.js");
const { UserHandler } = require("./controllers/userHandler.js");
const { SessionHandler } = require("./controllers/sessionHandler.js");

let main = ()=>
{
    let server = new Server();

    server.post('/login',SessionHandler);
    server.post('/signIn',UserHandler);
    server.start();
}

main();

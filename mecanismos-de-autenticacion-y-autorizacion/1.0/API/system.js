const { Server } = require("./server/server.js");
const { UserHandler } = require("./controllers/userHandler.js");

let main = ()=>
{
    let server = new Server();

    server.post('/',UserHandler);
    server.start();
}

main();

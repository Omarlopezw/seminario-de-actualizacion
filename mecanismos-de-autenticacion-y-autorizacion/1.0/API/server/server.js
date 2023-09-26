const { UserHandler } = require("../controllers/userHandler.js") 
const { GroupHandler } = require("../controllers/groupHandler.js") 
const { ResourceHandler } = require("../controllers/resourceHandler.js") 
const { AccessHandler } = require("../controllers/accessHandler.js") 
const { SessionHandler } = require("../controllers/sessionHandler.js") 
const { DataBaseHandler } = require("../../Database/database.js")
const file =  require("../../Database/Config.js")

//backend server
const http = require('http');
const { Console } = require("console")



class Server
{
    constructor()
    {
        this.host = '127.0.0.1';
        this.port = '8080';
        this.resources = [];
    }

    get(url,resource)
    {
        this.resources['GET' + url] = resource;
    }

    post(url, resource)
    {
        this.resources['POST' + url] = resource;        
    }

    start()
    {
        const server = http.createServer( (request, response)=> 
        {
            this.processRequest(request, response)
        })

        server.listen(this.port ,this.host,() => 
        {
            console.log('RUNNING SERVER...');
        })
    }
    processRequest(request, response)
    {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        let method = request.method;
        let url = request.url;
        const key = method + url;

        console.log('key: ' + key );

        console.log('method: ' + request.method);

        if (!this.resources[key]) 
        {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("Route not found");
        }
    
        else if( this.resources[key] )
        {
            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                let db = new DataBaseHandler(file);
                let sessionHandler = new SessionHandler(db);
                body = Buffer.concat(body).toString();
                // Convierte la cadena en un objeto JSON
                let requestBody = JSON.parse(body);
    
                response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    
                sessionHandler.logIn( requestBody.username,requestBody.password )
                .then(DBResponse => 
                {
                    console.log(requestBody.username,requestBody.password);
                    const data = { message: DBResponse } 
        
                    response.end(JSON.stringify( data ));
        
                    console.log( 'POST response: ', DBResponse )
                });
    
            });                
        }
    }
}

module.exports = {Server};

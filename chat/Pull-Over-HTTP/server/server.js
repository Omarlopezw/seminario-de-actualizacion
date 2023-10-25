
//backend server
const http = require('http');
const {Chat} = require('../API/chat.js');
const { SessionHandler } = require("../API/sessionHandler.js") 
const { EncryptionHandler } = require("../API/encryptionHandler.js") 
const { DataBaseHandler } = require("../API/database.js")
const file =  require("../API/Config.js")
const {generateCryptoKey} = require('../API/Utils/sharedKey.js')

class Server
{
    constructor()
    {
        this.host = '127.0.0.1';
        this.port = '8080';
        this.chat = new Chat();
        this.sessionData = [];
        this.sharedKey = '';
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
    compareSessionData(sessionData)
    {
        let response = false;
        
        for (const data of this.sessionData) 
        {
            if(data.userID == sessionData.userID && data.sessionKey == sessionData.sessionKey)
            {
                response = true;

                return response;
            }
        }

        return response;

    }
    createSharedKey() 
    {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let llave = '';
        let longitud = 16;
        
        for (let i = 0; i < longitud; i++) 
        {
            const indice = Math.floor(Math.random() * caracteres.length);
            llave += caracteres.charAt(indice);
        }
        
        return llave;
    }
    
    processRequest(request, response)
    {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type,userid');
        // response.setHeader('Access-Control-Allow-Headers', '*');

        let method = request.method;
        let url = request.url;
        const key = method + url;

        // console.log('key: ' + key );
        // console.log('url: ' + url );

        // if (!this.resources[key]) 
        // {
        //     response.writeHead(404, { "Content-Type": "text/plain" });
        //     response.end("Route not found");
        // }
    
        if( url == '/connectedUser'  )
        {

            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                body = Buffer.concat(body).toString();
                // Convierte la cadena en un objeto JSON
                let requestBody = JSON.parse(body);
                // let data = {username: requestBody.username}
                this.chat.connectedUser(requestBody);
                console.log('response: ' + body)
                console.log('response2: ' + requestBody)
                response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                response.end(JSON.stringify( requestBody ));
            });                
        }
        else if( url == '/getOnlineUsers'  )
        {
            let data = this.chat.getOnlineUser();
            console.log('ARRAY: ' + data);
            response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            response.end(JSON.stringify( data ));          
        }
        else if( url == '/getchatProposals'  )
        {
            let origin = request.headers['userid'];

            let proposals = this.chat.getchatProposals(origin);
            console.log('origin in header: ' + origin);
            console.log('proposals: ' + proposals);
            // console.log('proposals: ' + proposals[0]['state']);
            // console.log('id: ' + proposals[0]['id']);
            // console.log('origin in api: ' + proposals[0]['origin']);
            // console.log('target: ' + proposals[0]['userTarget']);
            response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            response.end(JSON.stringify( proposals ));          
        }
        else if( url == '/getActiveChats'  )
        {
            let origin = request.headers['userid'];

            let activeChats = this.chat.getActiveChats(origin);
            console.log('origin in header: ' + origin);
            console.log('activeChats: ' + activeChats);

            response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            response.end(JSON.stringify( activeChats ));          
        }
        else if( url == '/getSharedKey'  )
        {
            console.log('sharedKey: ' + this.sharedKey);

            response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            response.end(JSON.stringify( this.sharedKey ));          
        }
        else if( url == '/getMessage'  )
        {
            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                    body = Buffer.concat(body).toString();
                    // Convierte la cadena en un objeto JSON
                    let requestBody = body ? JSON.parse(body) : {};
                    // Acceder al encabezado "UserID"
                    let userID = request.headers['userid'];
    
                    let receivedMessage = this.chat.getMessage(userID,requestBody);

                    console.log('Chatid:', requestBody);
                    console.log('userID in confirn:', userID);
    
                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( receivedMessage ));
                
            });          
        }
        else if( url == '/newchatProposal'  )
        {
            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                    body = Buffer.concat(body).toString();
                    // Convierte la cadena en un objeto JSON
                    // let requestBody = JSON.parse(body);
                    let requestBody = body ? JSON.parse(body) : {};
                    // Acceder al encabezado "UserID"
                    let origin = request.headers['userid'];
    
                    this.chat.newChatProposal(origin,requestBody['userTarget']);
                    
                    console.log('Cuerpo de la solicitud:', body);
                    console.log('requestBody:', requestBody);
    
                    console.log('usuario origin y destino: ' + origin)
                    // console.log('usuario origin y destino: ' + requestBody.userTarget)
                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( body ));
                    // response.end(JSON.stringify( requestBody ));
                
            });          
        }
        else if( url == '/sendMessage'  )
        {
            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                    body = Buffer.concat(body).toString();
                    // Convierte la cadena en un objeto JSON
                    let requestBody = body ? JSON.parse(body) : {};
                    // Acceder al encabezado "UserID"
                    let userID = request.headers['userid'];
    
                    let sendedMessage = this.chat.sendMessage(userID,requestBody);

                    console.log('Cuerpo del mensaje:', requestBody.message);
                    console.log('userID in confirn:', userID);
    
                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( sendedMessage ));
                
            });          
        }
        else if( url == '/confirmChatProposal'  )
        {
            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                    body = Buffer.concat(body).toString();
                    // Convierte la cadena en un objeto JSON
                    let requestBody = body ? JSON.parse(body) : {};
                    // Acceder al encabezado "UserID"
                    let userID = request.headers['userid'];
    
                    let chat = this.chat.confirmChatProposal(userID,requestBody);
                    this.sharedKey = this.createSharedKey();
                    console.log('requestBody in confirn:', requestBody);
                    console.log('userID in confirn:', requestBody);
                    // console.log('chat:', chat);
    
                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( body ));
                    // response.end(JSON.stringify( requestBody ));
                
            });          
        }
        else if( url == '/cancelChatProposal'  )
        {
            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                    body = Buffer.concat(body).toString();
                    // Convierte la cadena en un objeto JSON
                    let requestBody = body ? JSON.parse(body) : {};
                    // Acceder al encabezado "UserID"
                    let userID = request.headers['userid'];
    
                    let chat = this.chat.cancelChatProposal(userID,requestBody);
                    
                    console.log('requestBody in cancel:', requestBody);
                    console.log('userID in cancel:', requestBody);
                    // console.log('chat:', chat);
    
                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( body ));
                    // response.end(JSON.stringify( requestBody ));
                
            });          
        }
        else if( url == '/login'  )
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
                    console.log('login' + requestBody.username,requestBody.password);
                    const data = { message: DBResponse } 

                    this.sessionData.push(DBResponse);
                    this.chat.connectUser(DBResponse.userID);

                    response.end(JSON.stringify( data ));
        
                    console.log( 'POST response: ', DBResponse )
                });
    
            });                
        }
        else if( url == '/logout'  )
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
                this.chat.disconnectUser(requestBody);
                
                let DBResponse = sessionHandler.logOUT();
                this.chat.release();
                const data = { message: DBResponse } 

                response.end(JSON.stringify( data ));
        
                console.log( 'POST response: ', DBResponse );
                console.log( 'requestBody: ', requestBody );
    
            });                
        }
        else if( url == '/signIn' )
        {
            let body = [];
            request.on('data', (chunk) => 
            {
                body.push(chunk);
            }).on('end', () => 
            {
                let db = new DataBaseHandler(file);
                let userHandler = new UserHandler(db);
                body = Buffer.concat(body).toString();
                // Convierte la cadena en un objeto JSON
                let requestBody = JSON.parse(body);
    
                response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                let userLoginData = {username: requestBody.username,password : requestBody.password}
                let userData = 
                {
                    name: requestBody.name ,
                    surname : requestBody.surname,
                    dni : requestBody.dni,
                    telephone : requestBody.telephone,
                    gender : requestBody.gender,
                    address : requestBody.address,
                    mail : requestBody.mail
                }
                userHandler.create( userLoginData,userData )
                .then(DBResponse => 
                {
                    const data = { message: DBResponse } 

                    this.sessionData.push(DBResponse);

                    response.end(JSON.stringify( data ));
        
                    console.log( 'POST response: ', DBResponse )
                });
    
            });                
        }
        else
        {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("server error");                
        }              
    }
}

let server = new Server();

server.start();

module.exports = {Server};

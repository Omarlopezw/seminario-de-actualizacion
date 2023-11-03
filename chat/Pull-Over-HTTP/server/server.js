
//backend server
const http = require('http');
const express = require('express');

const {Chat} = require('../API/chat.js');
const { SessionHandler } = require("../API/sessionHandler.js") 
const { UserHandler } = require("../API/userHandler.js") 
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
        let longitud = 32;
        
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
                response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                response.end(JSON.stringify( requestBody ));
            });                
        }
        else if( url == '/getOnlineUsers'  )
        {
            let data = this.chat.getOnlineUser();
            response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            response.end(JSON.stringify( data ));          
        }
        else if( url == '/getchatProposals'  )
        {
            let origin = request.headers['userid'];

            let proposals = this.chat.getchatProposals(origin);
            response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            response.end(JSON.stringify( proposals ));          
        }
        else if( url == '/getActiveChats'  )
        {
            let origin = request.headers['userid'];

            let activeChats = this.chat.getActiveChats(origin);

            response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
            response.end(JSON.stringify( activeChats ));          
        }
        else if( url == '/getSharedKey'  )
        {
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

                    let messageSent = this.chat.sendMessage(userID,requestBody);

                    if(messageSent['response'] != false)
                    {
                        console.log('api chat: ' + JSON.stringify(messageSent, null, 2));

                        console.log('server chat: ' + messageSent['messages'][0].timeStandSend);
                    }

                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( messageSent ));
                
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
    
                    let chatResponse = this.chat.confirmChatProposal(userID,requestBody);
                    this.sharedKey = this.createSharedKey();
    
                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( chatResponse ));                
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
    
                    let chatResponse = this.chat.cancelChatProposal(userID,requestBody);
    
                    response.writeHead(200,{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    response.end(JSON.stringify( chatResponse ));
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
                    const data = { message: DBResponse } 

                    this.sessionData.push(DBResponse);
                    this.chat.connectUser(DBResponse.userID);

                    response.end(JSON.stringify( data ));
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

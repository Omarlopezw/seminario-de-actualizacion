const http = require('http');
const fs = require('fs');
const path = require('path');

  // Rutas y sus archivos HTML asociados
  const routes = {
  '/login': './index2.html',
  '/home': './home.html',
  '/about': 'about.html',
  '/contact': 'contact.html',
};


function setFilePath(...args)
{
    //Desestructuramos array
    let [requestPath, rootDir]  = args;

    // Ruta del archivo solicitado en el sistema de archivos
    const filePath = path.join(rootDir, requestPath);

    // Determina el tipo de contenido según la extensión del archivo
    let contentType = 'text/plain';
    if (filePath.endsWith('.html')) 
    {
      contentType = 'text/html';
    } 
    else if (filePath.endsWith('.js')) 
    {
      contentType = 'application/javascript';
    }

    return [filePath,contentType];
}

const server = http.createServer((req, res) => {

  // Ruta absoluta al directorio raíz de tu proyecto
  const rootDir = path.join(__dirname, '../web');

  // Obtiene la ruta solicitada
  const requestedRoute = req.url;
  const [route,fileName] = routes.hasOwnProperty(requestedRoute)? [requestedRoute,routes[requestedRoute]] : [] ;

  if (req.method === 'GET') 
  {
      const requestPath = req.url === `${route}` ? `${fileName}` : req.url;

      let [filePath,contentType] = setFilePath(requestPath,rootDir);
    
     // Lee el archivo y envíalo como respuesta
    fs.readFile(filePath, (err, data) => 
    {
      if (err) 
      {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });

  } 
  else 
  {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

const port = 3002; // Puerto en el que se ejecutará el servidor
server.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

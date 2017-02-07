const http = require('http');
const url = require('url');
const qs = require('querystring');
// const cowsay = require('cowsay');

const server = new http.Server();

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url);

    const path = parsedUrl.pathname;
    
    const splitPath = path.split('/');

    const query = qs.parse(parsedUrl.query);

    if(req.method === 'GET') {
        console.log('splitPath, ' + splitPath[1]);
        if(splitPath[1] === 'fact'){
            res.end('Did you know that HTTP is not the only application layer protocol method for getting documents from the Internet? There are many others.');
        }
        else if(splitPath[1] === 'greeting'){
            if(query.salutation) {
                if(!splitPath[2]) {
                    console.log('hello');
                    res.end(query.salutation + ' stranger!');
                }
                if(splitPath[2]) {
                    const nameSplit = splitPath[2].split('?');
                    res.end(query.salutation + ' ' + nameSplit[0]);
                }
            }
            else {
                if(!splitPath[2]) {
                    res.end('hello stranger!');
                }
                if(splitPath[2]) {
                    res.end('hello' + ' ' + splitPath[2] + '!');
                }
            }
        }
        else {
            res.statusCode = 404;
            res.end('How can I help you today? Try entering a valid path, either fact or greeting.');
        }
    }
    else { 
        res.statusCode = 404;
        res.end(`http method ${req.method} is not supported: we cannot ${req.method} the ${parsedUrl.pathname}`);
    }
});

module.exports = server;
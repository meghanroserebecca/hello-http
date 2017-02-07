const http = require('http');
const url = require('url');
const qs = require('querystring');
// const cowsay = require('cowsay');

const server = new http.Server();

const factsArray = ['Did you know that HTTP is not the only application layer protocol method for getting documents from the Internet? There are many others.', 
    'HTTP works by using a user agent to connect to a server. The user agent could be a web browser or spider. The server must be located using a URL or URI. This always contains http:// at the start. It normally connects to port 80 on a computer.',
    'HTTP was developed by Tim Berners-Lee and his team and is currently coordinated by W3C'];

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url);

    const path = parsedUrl.pathname;
    
    const splitPath = path.split('/');

    const query = qs.parse(parsedUrl.query);

    const facts = JSON.stringify(factsArray);

    if(req.method === 'POST') { 
        if(splitPath[1] === 'facts') {
            let body = '';
            req.setEncoding('utf8');

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                factsArray.push(body);
                res.end('You have added ' + body + ' to facts!');
            })
        }  
    }
    else if(req.method === 'GET') {
        console.log('splitPath, ' + splitPath[1]);
        if(splitPath[1] === 'facts'){
            res.end(facts);
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
            res.end('How can I help you today? Try entering a valid path, either /facts or /greeting.');
        }
    }
    else { 
        res.statusCode = 404;
        res.end(`http method ${req.method} is not supported: we cannot ${req.method} the ${parsedUrl.pathname}`);
    }
});

module.exports = server;
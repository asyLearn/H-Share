let http = require('http');
let fs = require('fs').promises;
let routeHandler = require('./routeHandler');
let port = 3000;

async function handleRequest(request, response){
    let url = new URL(request.url, 'http://' + request.headers.host);
    let path = url.pathname;
    let pathSegments = path.split('/').filter(function(element){
        return element !=='';
    });

    await routeHandler.handleRoute(pathSegments, request, response);
}
let app = http.createServer(handleRequest);

app.listen(port, function(){
    console.log(`Server listening on port $(port)`);
});
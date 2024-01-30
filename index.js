let http = require('http');
let fs = require('fs').promises;
let routeHandler = require('./routeHandler');
let staticFileHandler = require('./staticFileHandler');
let port = 8090;

async function handleRequest(request, response){
    let url = new URL(request.url, 'http://' + request.headers.host);
    let path = url.pathname;
    let pathSegments = path.split('/').filter(function(element){
        return element !=='';
    });

    if (pathSegments.length > 0
		&& pathSegments[0] === 'static'
		&& request.method === 'GET') {

			staticFileHandler.handleStaticFileRoute(pathSegments, response);
			return;

	}   

    await routeHandler.handleRoute(pathSegments, request, response);
}

let app = http.createServer(handleRequest);

app.listen(port, function(){
    console.log(`Server listening on port $(port)`);
});
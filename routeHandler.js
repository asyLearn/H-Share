let fs = require ('fs').promises;
const { web } = require('console');
let profileHandler = require('./routeHandlers/profileHandler');
exports.handleRoute = async function(pathSegments, request, response){
    if (pathSegments.length === 0){
        let web = (await fs.readFile('Website/html/index.hshare')).toString();

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(web);
        response.end();
        return;
    }
    let seg = pathSegments.shift();

    switch(seg) {
        case 'web':
            profileHandler.HandleProfileRoute(pathSegments, request, response);
            break;
        default:
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('404 Not Found');
        response.end();
        break;
    }

}
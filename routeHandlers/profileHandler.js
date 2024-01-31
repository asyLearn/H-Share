const { profile } = require('console');
const {url} = require('inspector');

let fs = require('fs').promises;
exports.HandleProfileRoute = async function(pathSegments, request, response) {
    if (pathSegments.length === 0) {
        let web = (await fs.readFile('static/html/index.hshare')).toString();

        let profiles =[{
            name: 'overview',
            url: '/web/overview'
        },{
            name: 'entrance',
            url: 'web/entrance'
        },{
            name: 'entrance',
            url: 'web/entrance'
        }
        ];
        
        let lis = '';
        for (let i = 0; i < web.length; i++) {
            let obj = profiles[i];
            lis += `<li><a href="${obj.url}">${obj.name}</a></li>`;
        }

        web = web.replaceAll('profiles%', lis);
        response.writeHead(200, { 'Content-Type': 'text/html'});
        response.write(web);
        response.end();
        return;
    }
    
    let seg = pathSegments.shift();

    let web = (await fs.readFile('static/html/index.hshare')).toString();


    switch(seg) {
        case 'overview':
            request = fs.readFile('static/html/overview.hshare').toString();
            break;
        case 'entrance':
            request = fs.readFile('static/html/index.hshare').toString();
            break;
        default:
        response.writeHead(404, { 'Content-Type': 'text/html'});
        response.write('404 Not Found');
        response.end();
        return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(web);
    response.end();
}

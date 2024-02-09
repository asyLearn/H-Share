const fs = require('fs').promises;
const path = require('path');

exports.handleUpload = function(request, response) {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    });
    
    request.on('end', () => {
        const uploadPath = path.join(__dirname, '..', 'static');

        fs.writeFile(uploadPath, body, (err) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.end('500 Internal Server Error');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html'});
                response.end('Upp-laddning Lyckades!');
            }
        });
    });;
}

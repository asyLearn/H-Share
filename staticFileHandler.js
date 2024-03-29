let fs = require('fs/promises');

exports.handleStaticFileRoute = async function (pathSegments, response) {
	pathSegments[0] = 'static';
	let path = pathSegments.join('/');

	let fileContents;
	try {
		fileContents = await fs.readFile(path);
	} catch (err) {
		if (err.code === 'ENOENT') {
			response.writeHead(404, { 'Content-Type': 'text/plain' });
			response.write('404 Not Found');
			response.end();
		} else {
			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.write('500 Internal Server Error');
			response.end();
		}
		return;
	}


	let dotIndex = path.lastIndexOf('.');
	if (dotIndex === -1) {
		response.writeHead(400, { 'Content-Type': 'text/plain' });
		response.write('400 Bad Request');
		response.end();
		return;
	}
	let ext = path.substring(dotIndex + 1);

	let contentType;
	switch (ext) {
		case 'txt':
			contentType = 'plain/txt';
			break;
		case 'zip':
			contentType = 'application/zip';
			break;
		case 'html':
			contentType = 'text/html';
			break;
		case 'css':
			contentType = 'text/css';
			break;
		case 'js':
			contentType = 'text/javascript';
			break;
		case 'png':
			contentType = 'image/png'
			break;
		case 'hshare':
			contentType = 'text/html';
			break;
		case 'jpeg':
			contentType = 'image/jpeg';
			break;
		default:
			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.write('500 Internal Server Error');
			response.end();
			return;
	}

	response.writeHead(200, { 'Content-Type': contentType });
	response.write(fileContents);
	response.end();

}
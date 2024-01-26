const express = require('express');
const app = express();
const fs = require('fs').promises;

app.get('/', async (req, res) => {
    let co = (await fs.readFile('Website/html/index.hshare')).toString();

    let web = [
        { name: 'Ahmad', url: '/web/ahmad' },
        { name: 'Hannes', url: '/web/hannes' }
    ];
    let lis = '';
    for (let i = 0; i < web.length; i++) {
        let obj = web[i];
        lis += `<li><a href="${obj.url}">${obj.name}</a></li>`;
    }

    co = co.replaceAll('%web%', lis);

    res.send(co);
});

app.get('/web/:profile', async (req, res) => {
    let profile = req.params.profile;
    let web = (await fs.readFile(`Website/html/${profile}.hshare`)).toString();

    switch (profile) {
        case 'overview':
            web = web.replace('%name%', 'Ahmad');
            web = web.replace('%age%', '18');
            web = web.replace('%gender%', 'man');
            break;
        case 'hannes':
            web = web.replace('%name%', 'Hannes');
            web = web.replace('%age%', '19');
            web = web.replace('%gender%', 'man');
            break;
        default:
            res.status(404).send('404 Not Found');
            return;
    }

    res.send(web);
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

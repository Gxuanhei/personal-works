if (typeof window === 'undefined') {
    global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const data = require('./data.json');

const server = (port) => {
    const app = express();
    
    app.use(express.static('dist'));
    app.get('/search', (req, res) => {
        const html = renderMarkUp(renderToString(SSR));
        res.status(200)
            .send(html);
    });
    app.get('/text', (req, res) => {
        res.body = {
            code: 200,
            msg: 'hhh'
        };
    });
    
    app.listen(port, () => {
        console.log(`Server is listening on  Port : ${port}`);
    });
};

server(process.env.PORT || 3000);
// server(3000);

const renderMarkUp = (str) => {
    const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str) // 模板替换
        .replace('<!--HTML_DATA_PLACEHOLDER-->', `
        <script>
        window.__initial_data=${dataStr}
</script>
        `);
};
// const renderMarkUp = (str) => {
//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Title</title>
// </head>
// <body>
// <div id="root">
// ${str}
// </div>
// </body>
// </html>
// `;
// };

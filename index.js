const https = require('https');
const fs = require('fs');

https.createServer({
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
}, (req, res) => {
    if (req.url === '/login') { 
      res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
      res.write('gu_aiying\n');
    } else if (req.url === '/promise') {
      res.writeHead(200, {'Access-Control-Allow-Origin': '*','Content-Type': 'text/plain'});
      res.write('function task(x) {return new Promise((res, rej) => { x < 18 ? res(\'yes\') : rej(\'no\') })}\n');
    } else if (req.url === '/fetch') {
        res.writeHead(200, {'Access-Control-Allow-Origin': '*','Content-Type': 'text/html; charset=UTF-8'});
        res.write(`
        <input type="text" id="inp">
        <button id="bt">button</button>
        <script type="text/javascript">
            document
            .querySelector('#bt')
            .addEventListener('click', () => {
                let inpTxt = document.querySelector('#inp').value;
                const URL = inpTxt;
                fetch(URL)
                .then(res => res.text())
                .then(txt => {document.querySelector('#inp').value = txt})
                .catch(rej => rej('Ошибка!'));
            });
        </script>
        
        `)
    };
    res.end();
    
}).listen(4321);

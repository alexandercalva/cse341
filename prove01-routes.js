const newUsers = ['UserEx 1', 'UserEx 2'];
const requestHandler = (req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send!</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body>');
        res.write('<ul>');
        for (const us of newUsers) {
            res.write(`<li>${us}</li>`);
        }
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            //console.log(parsedBody);
            const newUser = parsedBody.split('=')[1];
            newUsers.push(newUser);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            res.end();
        });
       
    }
};

exports.handler = requestHandler;
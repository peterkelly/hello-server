/// <reference types="node" />
import * as express from 'express';
import * as bodyParser from 'body-parser';

const PORT = 5000;

const app = express();

const formRequestBody = bodyParser.urlencoded({ type: '*/*', extended: false });
const jsonRequestBody = bodyParser.json({ type: '*/*' });

function allowCrossOrigin(req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.log(req.method + ' ' + req.originalUrl);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
}

app.use(allowCrossOrigin);

app.get('/hello', (req, res) => {
    res.status(200).send('Hello World');
});

app.get('/people', (req, res) => {
    res.status(200).json([
        { name: 'Fred', age: 40, },
        { name: 'Gary', age: 34, },
    ])
});

app.post('/login', formRequestBody, (req, res) => {
    if ((req.body.username === 'peter') &&
        (req.body.password === 'secret')) {
        res.json({
            'access_token': '1234',
        });
    } else {
        res.status(401).send();
    }
});

app.post('/testpost', jsonRequestBody, (req, res) => {
    console.log('Got JSON data: ' + JSON.stringify(req.body, null, '    '));
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { log } from 'console';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const secret = "hello";
let bandName = '';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('tiny'));

const bandNameGenerator = (req, res, next) => {
    console.log(req.body);
    bandName = req.body['street'] + req.body['pet'];
    next();
};

app.use(bandNameGenerator);


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/api', (req, res) => {
    res.sendFile(__dirname + "/public/check.html");
});


app.get('/api/check', (req, res) => {
    
})
app.post('/api/check', (req, res) => {
    const password = req.body.password;
    if (password == secret){
        res.sendFile(__dirname + "/public/secrets.html");

    }else{
        res.sendFile(__dirname + "/public/check.html");
        
    }
    
    
})




app.post('/submit', (req, res) => {
    res.send(`<h1>Your band name is : </h1><h2>${bandName}</h2>`)
})

app.post('/register', (req, res) => {
    res.sendStatus(201);
});

app.put('/user/jang', (req, res) => {
    res.sendStatus(200);
});

app.patch('/user/jang', (req, res) => {
    res.sendStatus(200);
});

app.delete('/user/jang', (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});
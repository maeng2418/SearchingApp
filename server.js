const express = require('express'); //package.json으로 install한 express를 호출
const app = express(); //어플리케이션 생성
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'groovy365',
    database: 'test', //데이터베이스 스키마
});

dbConnection.connect();

const server = app.listen(4545, ()=>{ //server 객체는 4545포트를 listen 하게끔 되어 있습니다.
    console.log('Listening on port 4545');
});

app.get('/', (req, res) => {
    res.send('go to /content to see contents')
});

// '/'에 들어가면 실행됨.
app.get('/content', function(req,res){ //url명시
    console.log("Hello World");
    dbConnection.query('select * from content', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    })
});

app.get('/content/add', (req,res) => {
    const {name, subject, major, title, contents} = req.query;
    const INSERT_CONTENT_QUERY = `INSERT INTO content (Name, Subject, Major, Title, Contents) VALUES ('${name}','${subject}','${major}','${title}','${contents}')`;
    dbConnection.query(INSERT_CONTENT_QUERY, (err, results)=>{
        if(err){
            return res.send(err)
        }
        else {
            return res.send('succesfully added product')
        }
    })
});

app.get('/content/search', (req,res) => {
    const {title} = req.query;
    const SELECT_SEARCH_QUERY = `SELECT * FROM content WHERE Title LIKE '${title}'`;
    dbConnection.query(SELECT_SEARCH_QUERY, (err, results)=>{
        if(error) console.log(error);
        else{
            res.send(rows);
        }
    })
});

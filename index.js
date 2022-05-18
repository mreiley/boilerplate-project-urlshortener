require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
// const dns = require('dns');
const Database = require("@replit/database");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// validar el url, creamos el short_url el cual enviams en un json junto
// al url original
app.post('/api/shorturl/',(req,res) =>{
  
  // const url = new URL(req.body.url);
  // if(url) {
  //   const db = new Database();
  //   db.get(req.body.url).then(value => {
  //     // console.log(value); 
  //     if(value != null) {
        
  //       res.json({original_url : req.body.url, short_url : value});
  //     }else {
  //       const urlId = Math.floor(Math.random() * 100);
  //       db.set(req.body.url,urlId)
  //         .then(() => {
  //           // console.log('entra');
  //           res.json({original_url : req.body.url, short_url : urlId});    
  //         });
  //     }
  //   });


      // const db = new Database();
      // db.list().then(keys => {
        // console.log(keys);
      //   // keys.forEach((k) => {
      //   //   console.log(keys[k]);
      //   // })
      // });

      // db.empty();
       
     const db = new Database();
     db.delete(req.body.url).then(() => {console.log('borrado')});
  
  // }else{ // TypeError [ERR_INVALID_URL]: Invalid URL: mario
  //   res.json({error : 'invalid url'});
  // }
});

// Buscar en el hash y realizar el redirec
app.use('/api/shorturl/:short_url',(req,res)=>{
  // res.redirect("http://www.node.org");
  
  // console.log(req.body.url); 
  console.log(req.params.short_url); 
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

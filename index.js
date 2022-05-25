require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
// const dns = require('dns');
const Client = require("@replit/database");

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
  const client = new Client(); 
  const url = new URL(req.body.url);
  if(url) {
    // db.get(req.body.url).then(value => {
      // console.log(value); 
      // if(value != null) {
        
        // res.json({original_url : req.body.url, short_url : value});
        // }else {
    
        (async () => {
          const urlId = Math.floor(Math.random() * 100);
          client.set(urlId,req.body.url) 
            .then(() => { //Validar q siempre se ejecute el then asi no se registre el valor.
              res.json({original_url : req.body.url, short_url : urlId});    
            });
        });
  
    // }
    // });

  // (async () => {
  //     const urlId = Math.floor(Math.random() * 100);
  //     await client.set('3', urlId).then(() => {});
  //   }
  // )();

  // (async ()=> {
  //     await client.get('3').then((value)=>{
  //       console.log(value);
  //     });
  //   }
   
  // )();
  
  // ( async () => {
  //     await client.delete(94).then(() => {});
  //   }
  // )();
  
  // (async ()=> {
  //     await client.list().then((keys)=>{
  //       keys.forEach((e) => {
  //         client.get(e).then((value)=>{console.log(value)});
          
  //       });
  //       // for(let e of keys) {
  //       //    client.delete(e).then(()=>{});
  //       // };
  //     });
  //   }
  // )(); 
  
  }else{ // TypeError [ERR_INVALID_URL]: Invalid URL: mario
    res.json({error : 'invalid url'});
  }
});

// Buscar en el hash y realizar el redirec
app.use('/api/shorturl/:short_url',(req,res)=>{
  const client = new Client(); 
  (async () => {
      client.get(req.params.short_url).then((value) => {
        res.redirect(value);      
      });
    }
    
  )();

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const express = require('express');

const path = require('path');

const fs = require('fs');




const app = express();




app.set('view engine','ejs');

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));




app.get('/', function(req, res){

    res.render('index');

});

app.get('/create', function(req, res){

    res.render('adduser');

});


app.get('/delete', function(req, res){

    console.log(req);
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
    


    let completeTask = req.query;
    console.log(completeTask);
    if (typeof completeTask === "string") {
        console.log('if');
        users.splice(users.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        console.log('else');
        for (let i = 0; i < completeTask.length; i++) {     
            users.splice(users.indexOf(completeTask[i]), 1);
        }
    }
  //  delete users[req.body.id];

   const users1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));




    res.render('dashboard',{users});


  

});

app.post('/user-login', function(req, res){

    if(req.body.email == 'ali@yahoo.com' && req.body.password == '123')
    {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
        res.render('dashboard',{users});
    }
    else
    {
        res.render('index');
    }
});

app.post('/create-data', function(req, res){

   

    fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj.push(req.body); 
        json = JSON.stringify(obj); 
        fs.writeFile('data/users.json', json, 'utf8', function readFileCallback(err, data)
        {
            if (err)
            {
                console.log(err);
            } else 
            {
                console.log('data added');
                const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
                res.render('dashboard',{users});
            }
        }); 
    }});

  

});









app.get('/dashboard',function(req,res){

    
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));




    res.render('dashboard',{users});

});

app.get('/edituser',function(req,res){

    
   // const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));




    res.render('edituser');

});















app.listen(3000);
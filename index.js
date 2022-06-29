const express = require('express');
const app = express();
const port=8000;
const expressLayout=require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayout);

//use express router
app.use('/', require('./routes'));




//extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is runnig on port: ${port}`);
});
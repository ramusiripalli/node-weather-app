const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const request = require('request');
const geoCode = require('./utils/geoCode.js');
const foreCast = require('./utils/forecast.js');


//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')


//set up handlebar and views,partials location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


/*

*/


app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
res.render('index',{
    title:'Weather App',
    name:'Ramu Siripalli'
})
})



app.get('/help',(req,res)=>{
res.render('help',{
    title:'Help page',
    name:'Ram',
    helpText:'This is some helpFul Text'
});
})

app.get('/about',(req,res)=>{
res.render('about',{
    title:'About Me',
    name:'Ramu Siri'
});
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            Error: 'No address Found'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
           return  res.send({
            error
           })
        }
        
    foreCast(latitude, longitude, (error, foreCastdata) => {
        if(error)
        {
            return res.send({ error })
        }

        res.send({
            forecast:foreCastdata,
            location,
            address:req.query.address
        })
        
        
        
    })
        
    });

    console.log(req.query.address);
    // res.send({
    //     location:'Palasa , Andhra pradesh',
    //     forecast:'25',
    //     address:req.query.address
    // });
})






app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        //we need to use return to stop this error
       return  res.send({
            error:'You must provide a search term'
        })
    }
   console.log(req.query.search);
    res.send({
        products:[]
    })
})
/*
So our goal is to figure out

how to get this data in the client side JavaScript file.

Then you'll use what we've learned to get this data

in the client side JavaScript file.
*/









/*
So by using the wild card character, we can match

either every request or we can match a bunch

of requests that match a specific pattern.
*/

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title:'404 Error',
        name:'Ramu',
        errorMessage:'Help article notfound'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        name:'Ramu',
        errorMessage:'Page not found'
    });
})



app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
/*
The first thing we need to do is make sure the

program is running and then after that

we're going to register our new private key file.

*/
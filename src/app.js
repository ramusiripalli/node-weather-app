const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const request = require('request');
const geoCode = require('./utils/geoCode.js');
const foreCast = require('./utils/forecast.js');

const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')


//set up handlebar and views,partials location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

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
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return  res.send({
            error:'You must provide a search term'
        })
    }
   console.log(req.query.search);
    res.send({
        products:[]
    })
})

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

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})



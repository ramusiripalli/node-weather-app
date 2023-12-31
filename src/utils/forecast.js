const request = require('request');

const foreCast = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=e01352a8539c9370e65b172c42676d0e&query='+latitude+','+longitude;
    request({url,json:true},(error,{body})=> { 
        if(error)
        {
          callback('Unable to connect to weather service!',undefined);
        }
        else if(body.error)
        {
        callback('Unable to find location',undefined);
        }
        else{
        callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}


module.exports = foreCast; 
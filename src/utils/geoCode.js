const request = require('request');
const geoCode = (address,callback) => {
    const geoCodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmFtdXNpcmlwYWxsaTI3NzIiLCJhIjoiY2xsNXdhY210MGVxYzNlb3p1cTJubjdsaSJ9.NwjoCSSOf2BdwIUbjmaaYA&limit=1';
    request({url:geoCodeUrl, json:true},(error,{body})=>{
        if(error)
        {
          callback('Unable to connect to Location service',undefined);
        }
        else if(body.features.length === 0)
        {
        callback('Unable to find the location and place were missing, Try again with different search term',undefined);
        }
        else {
            callback(undefined,{ 
                longitude : body.features[0].center[0],
                latitude :  body.features[0].center[1],
                location :  body.features[0].place_name
            })
            
        }
    })
}


module.exports =  geoCode;
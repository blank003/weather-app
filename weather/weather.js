const request=require('request');
var getWeather=(lat,lng,callback)=>{
request({
	url:`https://api.darksky.net/forecast/801318326370bb5485433f4520b7da8a/${lat},${lng}`,
	json:true
},(error,response,body)=>{
	if(error){
		callback('Unable to connect to the DarkSky.io server.');
	}else if(response.statusCode===400){
		callback('Unable to fetch weather.');
	}else if(response.statusCode===200){
		callback(undefined,{
			temperature:body.currently.temperature,
			apparentTemperature:body.currently.apparentTemperature,
			summary:body.currently.summary,
			humidity:body.currently.humidity
		});
 }
});
};
module.exports.getWeather=getWeather;
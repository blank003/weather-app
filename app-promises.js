const yargs=require('yargs');
const axios=require('axios');
const argv=yargs
 .options({
 	a:{
 		demand:true,
 		alias:'address',
 		describe:'Address to fetch weather for',
 		string:true
 	}
 })
 .help()
 .alias('help','h')
 .argv;
 var encodedAddress=encodeURIComponent(argv.address);
 var geocodeUrl=`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
 axios.get(geocodeUrl).then((response)=>{
 	if(response.data.status==='ZERO_RESULTS'){
 		throw new Error('Unable to find that address');
 	}
 	var lat=response.data.results[0].geometry.location.lat;
 	var lng=response.data.results[0].geometry.location.lng;
var weatherUrl=`https://api.darksky.net/forecast/801318326370bb5485433f4520b7da8a/${lat},${lng}`;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl);
 }).then((response)=>{
var temperature=((response.data.currently.temperature-32)*(5/9)).toFixed(2);
var apparentTemperature=((response.data.currently.apparentTemperature-32)*(5/9)).toFixed(2);
console.log(`The weather is ${response.data.currently.summary} today.`);
		console.log(`It's currently ${temperature} degrees. It feels like ${apparentTemperature} degrees.`);
		console.log(`The humidity is ${response.data.currently.humidity}`);
 }).catch((e)=>{
if(e.code==='ENOTFOUND'){
	console.log('Unable to connect to API servers.');
  }else{
  	console.log(e.message);
  }
 });

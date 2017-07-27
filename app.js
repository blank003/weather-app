const yargs=require('yargs');
const geocode=require('./geocode/geocode.js');
const weather=require('./weather/weather.js');
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
 geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
 	if(errorMessage){
 		console.log(errorMessage);
 	}else{
 		console.log(results.address);
 		weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
	if(errorMessage){
		console.log(errorMessage);
	}else {
        var tem=((weatherResults.temperature-32)*(5/9)).toFixed(2);
        var tem1=((weatherResults.apparentTemperature-32)*(5/9)).toFixed(2);
     //   console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
		console.log(`The weather is ${weatherResults.summary} today.`);
		console.log(`It's currently ${tem}. It feels like ${tem1}.`);
		console.log(`The humidity is ${weatherResults.humidity}`);
	}
});
 	}
 });

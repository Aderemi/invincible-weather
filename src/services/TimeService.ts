import Service from "../injection/ServiceDecorator";
import Weather from "../models/Weather";

@Service()
export default class TimeService {
  getTime(weather: Weather): string{
    if(weather.timeZone == undefined){
      throw new Error("Timezone was not returned for this city")
    }
    let dateNow: Date = new Date();
    let time;
    if(isNaN(parseInt(weather.timeZone))){
      time = new Date(dateNow.toLocaleString("en-US", {timeZone: weather.timeZone}));
    } else {
      time = dateNow.getTime() + (dateNow.getTimezoneOffset() * 60000) + (3600000 * parseInt(weather.timeZone));
    }
    return (new Date(time)).toLocaleString();
  }
}
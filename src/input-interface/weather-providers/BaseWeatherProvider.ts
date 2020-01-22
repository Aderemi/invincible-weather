import Weather from "../../models/Weather";
import Axios from "axios";
import {APIErrorException} from "../../exceptions/APIErrorException";
import WeatherProviderInfo from "../../models/WeatherProviderInfo";

export default abstract class BaseWeatherProvider{
    abstract getInfo(): WeatherProviderInfo;

    abstract getUrl(longitude: number, latitude: number): string;

    abstract formatWeatherData(data: string): Weather;

    abstract  extractTimeZone(model: any): string;

    abstract  extractCityName(model: any): string;

    public static calculateFarenheit(celcius: number): number{
        return celcius * 1.8 + 32;
    }

    async fetchWeather(longitude: number, latitude: number): Promise<Weather> {
        const url = this.getUrl(longitude, latitude);
        console.log(url);
        let response;
        try{
            response = await Axios.get(url);
            if(response.status == 200){
                const responseObj = response.data;
                const weather: Weather = this.formatWeatherData(responseObj);
                weather.fahrenheit = BaseWeatherProvider.calculateFarenheit(weather.celsius);
                weather.timeZone = this.extractTimeZone(responseObj);
                weather.city_name = this.extractCityName(responseObj);
                return weather;
            }
        }catch (error){
            throw new APIErrorException(error, 500, url);
        }
    }
}
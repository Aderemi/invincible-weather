import TimeService from "../services/TimeService";
import {IUserInterface} from "../input-interface/user-interface/IUserInterface";
import GeoLocationConverterService from "../services/GeoLocationConverterService";
import Output from "../models/Output";
import BaseWeatherProvider from "../input-interface/weather-providers/BaseWeatherProvider";
import Weather from "../models/Weather";

export default abstract class BaseController{
    protected userInterface: IUserInterface;
    constructor(
        protected timeService: TimeService,
        protected geoConverter: GeoLocationConverterService,
        protected weatherProviderService: BaseWeatherProvider
    ){}

    setUserInterface(uInterface: IUserInterface){
        this.userInterface = uInterface;
        this.userInterface.setProvider(this.weatherProviderService);
    }

    index(){
        this.userInterface.showIntro();

        if(this.userInterface.getInput().length < 1){
            this.userInterface.showInfoText();
            return;
        }
        const locations: string[] = this.userInterface.getInput();
        for (const location of locations){
            this.geoConverter.convertToLongAndLat(location)
                .then(geo => {
                    const g: any = geo as any;
                    this.weatherProviderService.fetchWeather(g.longitude, g.latitude)
                        .then(w => {
                            const weather = w as Weather;
                            let output:Output= new Output();
                            output.forecast = weather.forecast;
                            output.temp_farenheint = weather.fahrenheit;
                            output.temp_celsius = weather.celsius;
                            output.city_name = weather.city_name;
                            output.time = this.timeService.getTime(weather);
                            this.userInterface.render([output]);
                        })
                        .catch(error => this.userInterface.showError(error.message));
                })
                .catch(error => this.userInterface.showError(error.message));
        }
    }
}
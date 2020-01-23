import {IUserInterface} from "./IUserInterface";
import Output from "../../models/Output";
import Service from "../../injection/ServiceDecorator";
import BaseWeatherProvider from "../weather-providers/BaseWeatherProvider";

@Service()
export default class CommandlineInterface implements IUserInterface {
    private weatherProvider: BaseWeatherProvider;

    showIntro(){
        console.log(`|****************************| ${this.weatherProvider.getInfo().name} |*****************************|`);
        console.log(`We will be using <${this.weatherProvider.getInfo().name}> for this weather forecast`);
        console.log(`Their general API documentation is at <${this.weatherProvider.getInfo().url}>`);
        console.log(`Their default temperature measurement unit is <${this.weatherProvider.getInfo().default_temp_unit}>`);
    }

    setProvider(weatherProvider: BaseWeatherProvider) {
        this.weatherProvider = weatherProvider;
    }

    showError(error: string) {
        console.log(`[X] Error: ${error}`);
    }

    showInfoText() {
        console.log(`>>> Please provide your input cities separated with comma, can be city name and/or zip as commandline argument (example ./npm run -- lagos, 100213, new york)`)
    }

    getInput = (): string[] => {
        return this.parseArgs(process.argv);
    };

    parseArgs = (argsVector: string[]): string[] => {
        return argsVector
            .slice(2, argsVector.length)
            .join(' ')
            .split(',')
            .map(location => location.trim())
            .filter(location => location.length > 0);
    };

    render = (outputs: Output[]) => {
        console.log(`Result: `);
        outputs.forEach(output => {
            console.log(`City Name: ${output.city_name}
Current Time: ${output.time}
Current Temperature(Celsius): ${output.temp_celsius}
Current Temperature(Fahrenheit): ${output.temp_farenheint}
Forecast: ${output.forecast}
..................................................................`)
        });
    }
}
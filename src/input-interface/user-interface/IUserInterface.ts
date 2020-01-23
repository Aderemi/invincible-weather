import Output from "../../models/Output";
import BaseWeatherProvider from "../weather-providers/BaseWeatherProvider";

export interface IUserInterface {
  setProvider(weatherProvider: BaseWeatherProvider);
  showIntro();
  showError(error: string);
  showInfoText();
  getInput(): string[];
  render(output: Output[]);
}
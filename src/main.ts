import {Injector} from "./injection/Injector";
import BaseController from "./controllers/BaseController";
import OpenWebController from "./controllers/OpenWeatherController";
import DarkSkyNetController from "./controllers/DarkSkyNetController";
import CommandlineInterface from "./input-interface/user-interface/CommandlineInterface";
import {IUserInterface} from "./input-interface/user-interface/IUserInterface";

// I implement two weather to show the level of flexibility in the class: design OpenWeather and DarkSky.
// Both are injected through dependency injection, both will be queried for current weather. Any other
// Weather provider can be implemented by simply extending input-interface/weather-providers/BaseWeatherProvider
// create its controller by extending controllers/BaseController
const openWeather = Injector.resolve<BaseController>(OpenWebController);
const darkSky = Injector.resolve<BaseController>(DarkSkyNetController);

// I created frame work that allow implementation of different types of interface, be it restfulAPI, HTML or console
// I implemented commandline interface
const commandLineInterface = Injector.resolve<IUserInterface>(CommandlineInterface);

// To use a controller just set user interface you intend to use and call your controller action
// DarkSky
darkSky.setInterface(commandLineInterface);
darkSky.index();

// OpenWeather
openWeather.setInterface(commandLineInterface);
openWeather.index();

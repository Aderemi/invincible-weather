import TimeService from "../services/TimeService";
import GeoLocationConverterService from "../services/GeoLocationConverterService";
import BaseController from "./BaseController";
import DarknetWeatherProvider from "../input-interface/weather-providers/DarknetWeatherProvider";
import Service from "../injection/ServiceDecorator";

@Service()
export default class OpenWebController extends BaseController{
  constructor(
    protected timeService: TimeService,
    protected geoConverter: GeoLocationConverterService,
    protected darkSkyNetService: DarknetWeatherProvider
  ){
    super(timeService, geoConverter, darkSkyNetService);
  }
}
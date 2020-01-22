import Service from "../injection/ServiceDecorator";
import Axios from "axios";
import {APIErrorException} from "../exceptions/APIErrorException";
import {TownNotFoundException} from "../exceptions/TownNotFoundException";
import {NetworkNotAvailableException} from "../exceptions/NetworkNotAvailableException";

@Service()
export default class GeoLocationConverterService{
    GEO_URL = "https://darksky.net/geo?q=_";
    async convertToLongAndLat(location:string): Promise<string> {
        try {
            const geo = await Axios.get(this.GEO_URL.replace("_", location));
            if(geo && geo.status == 200){
                return geo.data;
            }
            throw new APIErrorException(geo.statusText, this.GEO_URL.replace("_", location));
        }catch (error){
            if(!error.response) {
                throw new NetworkNotAvailableException(error.message);
                return;
            }
            if(error.response && error.response.status == 404){
                throw new TownNotFoundException(location);
                return;
            }
            if(error.response) console.log(error.response.statusText);
            else console.log(error.name + ":<> " + error.number);
        }
    }
}
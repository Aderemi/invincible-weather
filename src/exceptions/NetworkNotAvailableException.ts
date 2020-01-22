export class NetworkNotAvailableException extends Error{
    constructor(msg:string){
        super(`Network not available: '${msg}'`);
    }
}
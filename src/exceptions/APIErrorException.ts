export class APIErrorException extends Error{
    constructor(msg:string, errorCode:number, url:string){
        msg = `${msg} was thrown with code ${errorCode} while calling ${url}`;
        super(msg);
    }
}
export class APIErrorException extends Error{
  constructor(msg:string, url:string){
    msg = `${msg} was thrown while calling ${url}`;
    super(msg);
  }
}
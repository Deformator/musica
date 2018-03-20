import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class MusicProvider {

  private API: string = 'http://www.orangevalleycaa.org/api/music';  

  constructor(public http: HttpClient) {
  }

  getMusic(){
   return this.http.get<any>(this.API)
  }

}

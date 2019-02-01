import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


const url = "./assets/bar-data.json";

@Injectable()
export class LocationService {

  

  constructor(public http: HttpClient) {
  }

  getLocations(){
    return this.http.get(url);
  }
}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BarProvider {

  constructor(public http: HttpClient) {
  }

  getBars(){
    return BARS;
  }

}

const BARS: any = [
  {
    name: `Mark's Place`,
    lat: 43.648410, 
    long: -79.376470,
    status: "busy"
  },
  {
    name: `Corner Place`,
    lat: 43.649780, 
    long: -79.371340,
    status: "packed"
  },
  {
    name: `Hot House`,
    lat: 43.649290, 
    long: -79.373820,
    status: "dead"
  },
  {
    name: `C'est What`,
    lat: 43.648410, 
    long: -79.373390,
    status: "busy"
  },
  {
    name: `Earl's`,
    lat: 43.648410, 
    long: -79.373390,
    status: "busy"
  },
  {
    name: `Early Mercy`,
    lat: 43.645160, 
    long: -79.398060,
    status: "packed"
  },
  {
    name: `Crocodile Rock`,
    lat: 43.648450, 
    long: -79.388550,
    status: "dead"
  }
];

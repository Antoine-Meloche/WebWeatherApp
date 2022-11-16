import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
const https = require('https');
const request = require('request');

@Injectable()
export class ApiService {
  public apicall(apiType, q) {
    if (apiType === 'weather') {
      request(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${q}&days=10&aqi=no&alerts=yes`,
        (err, res, body) => {
          if (err) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          }
          return body;
        },
      );
    } else if (apiType === 'search') {
      request(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey.apiKey}&q=${q}`,
        (err, res, body) => {
          if (err) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          }

          console.log(body + 'service')
          return body;
        },
      );
    } else {
      console.log(apiType);
      console.log(q);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}

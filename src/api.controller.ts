import { Controller, Get, Query } from '@nestjs/common';
const axios = require('axios');

@Controller('api')
export class ApiController {
  @Get()
  async apicall(@Query('apiType') apiType, @Query('q') q) {
    const { data: response } = await axios.get(
      `https://api.weatherapi.com/v1/${
        apiType === 'weather' ? 'forecast' : 'search'
      }.json?key=${process.env.API_KEY}&q=${q}${
        apiType === 'weather' ? '&days=10&aqi=no&alerts=yes' : ''
      }`,
    );
    return response;
  }
}

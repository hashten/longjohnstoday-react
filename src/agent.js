import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8081/api'
const WEATHER_API = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.193359/lat/59.220934/data.json'
// http://opendata.smhi.se/apidocs/metfcst/demo_point.html

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
};

const User = {
  current: () =>
    requests.get('/user')
};

const weatherRequest = {
  get: () => 
    superagent.get(`${WEATHER_API}`).then(responseBody)
};

const Weather = {
  current: () =>
    weatherRequest.get()
};

export default {
  User,
  Weather
};
import got from 'got';
import { dateMinusADay, fullDateString } from '../utils/fullDate';

const beachURL = 'https://secure.toronto.ca/opendata/adv';

export async function getLatestData() {
  const url = `${beachURL}/last_update/v1?format=json`;
  const response = await got(url);
  const lastUpdate = response.body;
  const date = dateMinusADay(lastUpdate.split(' ')[0]);
  const urlTwo = `${beachURL}/beach_results/v1?format=json&startDate=${date}&endDate=${date}`;
  const res = await got(urlTwo);
  return res.body;
}

export async function getAllData() {
  const url = `${beachURL}/beach_results/v1?format=json&startDate=1900-01-01&endDate=${fullDateString(new Date().toString())}`
  const res = await got(url)
  return res.body
}

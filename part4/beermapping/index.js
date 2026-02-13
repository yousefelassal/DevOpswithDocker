const axios = require('axios');
const fs = require('fs');
const express = require('express');
const path = require('path');

const mangelCity = async (city) => {
  const encodedCity = encodeURIComponent(city);
  const url = `http://beermapping.com/webservice/loccity/731955affc547174161dbd6f97b46538/${encodedCity}`;
  console.log(url);

  const response = await axios.get(url);
  fs.writeFileSync(`data/${city}.xml`, response.data);
}

const cities = [
  'turku',
  'helsinki',
  'tampere',
  'lahti',
  'oulu',
  'jyvaskyla',
  'pori',
  'savonlinna',
  'vaasa',
  'rovaniemi',
  'kuopio',
  'kouvola',
  'pori',
  'mikkeli',
  'kotka',
  'joensuu',
  'imatra',
  'kemi',
  'seinajoki',
  'kajaani',
  'hameenlinna',
  'rauma',
  'kokkola',
  'lappeenranta',
  'nokia',
  'raahe',
  'las vegas',
  'boston',
  'new york',
  'los angeles',
  'san francisco',
  'chicago',
  'miami',
  'philadelphia',
  'dallas',
  'houston',
  'washington',
  'atlanta',
  'phoenix',
  'seattle',
  'minneapolis',
  'denver',
  'san diego',
  'detroit',
  'tampa',
  'st. louis',
  'baltimore',
  'charlotte',
  'orlando',
  'san antonio',
  'portland',
  'pittsburgh',
  'sacramento',
  'cincinnati',
  'toronto',
  'vancouver',
  'montreal',
  'calgary',
  'edmonton',
  'ottawa',
  'winnipeg',
  'quebec',
  'halifax',
  'saskatoon',
  'paris',
  'london',
  'berlin',
  'rome',
  'madrid',
  'barcelona',
  'lisbon',
  'amsterdam',
  'brussels',
  'vienna',
  'prague',
  'budapest',
  'warsaw',
  'moscow',
  'istanbul',
  'athens',
  'stockholm',
  'oslo',
  'copenhagen',
  'helsinki',
  'reykjavik',
  'dublin',
  'zurich',
  'geneva',
  'luxembourg',
  'monaco',
  'dubai',
  'tokyo',
  'beijing',
  'shanghai',
  'hong kong',
  'singapore',
  'sydney',
  'auckland',
  'wellington',
  'melbourne',
  'brisbane',
  'perth',
  'adelaide',
  'darwin',
]

const main = async () => {

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const cityParts = city.split(' ').length > 1 ? city.split(' ')[1] : city;
    await mangelCity(cityParts)
  }

}

const app = express();
const port = 3000;

app.get('/locations/:place', (req, res) => {
  const place = req.params.place;
  const city = place.split(' ').length > 1 ?  place.split(' ')[1] : place;
  let filePath = path.join(__dirname, 'data', `${city}.xml`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    filePath = path.join(__dirname, 'data', `mikkeli.xml`);
    res.sendFile(filePath);
  }
});

app.get('/locations', (req, res) => {
  res.json(cities);
});

app.listen(port, () => {
  console.log(`Beermapping server running at http://localhost:${port}/`);
});

//main();

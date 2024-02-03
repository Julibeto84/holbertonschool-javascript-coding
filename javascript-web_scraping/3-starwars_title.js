#!/usr/bin/node

const url = 'https://swapi-api.hbtn.io/api/films/';
const id = process.argv[2];

const request = require('request');

request(url + id, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const bodyJson = JSON.parse(body);
    console.log(bodyJson.title);
  }
});

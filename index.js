const extractData = require('./extractData');
const fetch = require('isomorphic-fetch');

module.exports = function (httpString) {
  const {headers, body, method, url} = extractData(httpString);
  const requestHeaders = new Headers();
  headers.forEach(header => requestHeaders.append(header.key, header.value));

  const request = new Request(url, {
    method,
    headers: requestHeaders,
    body
  });

  return fetch(request);
};
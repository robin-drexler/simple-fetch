const extractData = require('./extractData');
const fetch = require('isomorphic-fetch');


// const result = extractData(`
//   POST https://httpbin.org/post
//   Cache-Control: lolol
//
// '{
//       "scripts": {
//     "test": "   jest"
//   }
// }'
//
// `);


const result = extractData(`GET https://httpbin.org/headers
Foo: bar

`);


const {headers, body, method, url} = result;
const myHeaders = new Headers();
headers.forEach(header => myHeaders.append(header.key, header.value));

const myInit = {
  method,
  headers: myHeaders,
  body
};

const request = new Request(url, myInit);


fetch(request).then(r => r.text())
  .then((text) => console.log(text))

console.log(result)
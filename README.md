# plain-fetch

> Easy way to construct simple http fetch requests

Most http requests are fairly simple.

```
POST /post                     // request line (method and url)
Host: https://httpbin.org      // headers (optional)
Content-Type: application/json
X-Foo: bar

{"hello": "world"}             // body (optional)

```

This library allows you to write simple http requests in the same way.

```js
const plainFetch = require('plain-fetch');

plainFetch(`
  POST https://httpbin.org/post
  Content-Type: application/json

  {"a": 1}
`).then(res => console.log(res.ok)) // returns fetch Response object

```

There's one difference to the example above.
Instead providing the path in the request line and the host in the  `Host` header, the entire URL is passed in the request line.

The result of `plainFetch` is a [fetch response object](https://developer.mozilla.org/en-US/docs/Web/API/Response)


### more examples

Get wind data for Chicago from Yahoo weather.

```js
const plainFetch = require('plain-fetch');

plainFetch(`
  GET https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
`)
.then(res => res.json())
.then(data => console.log(data.query.results.channel.wind))

```

send headers to httpbin

```js
const plainFetch = require('plain-fetch');

plainFetch(`
  GET https://httpbin.org/headers
  Hello: world
  User-Agent: yolo
`)
.then(res => res.text())
.then(data => console.log(data))

```

Omitting the method will default to GET requests.

```js
const plainFetch = require('plain-fetch');

plainFetch(`https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
.then(res => res.json())
.then(data => console.log(data.query.results.channel.wind))

```


## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i plain-fetch --save
```

## Running tests


```sh
$ npm i -d && npm test
```

const extractData = require('../extractData');

describe('extract data', () => {
  test('extracts method and url from simple string', () => {
    const result = extractData(`GET http://google.com`);
    expect(result.method).toEqual('GET');
    expect(result.url).toEqual('http://google.com');
  });

  test('extracts headers with body present', () => {
    const result = extractData(`
    GET http://google.com
    Cookie: foo
    X-Foo: bar
    
    body1
`);

    const [cookie, foo] = result.headers;
    expect(cookie.key).toEqual('Cookie');
    expect(cookie.value).toEqual('foo');

    expect(foo.key).toEqual('X-Foo');
    expect(foo.value).toEqual('bar');

  });

  test('extracts headers without body present', () => {
    const result = extractData(`
    GET http://google.com
    Cookie: foo
    X-Foo: bar
`);

    const [cookie, foo] = result.headers;
    expect(cookie.key).toEqual('Cookie');
    expect(cookie.value).toEqual('foo');

    expect(foo.key).toEqual('X-Foo');
    expect(foo.value).toEqual('bar');

  });

  test('extracts headers without body present but trailing new lines', () => {
    const result = extractData(`
    GET http://google.com
    Cookie: foo
    X-Foo: bar
    
    
    
`);

    const [cookie, foo] = result.headers;
    expect(cookie.key).toEqual('Cookie');
    expect(cookie.value).toEqual('foo');

    expect(foo.key).toEqual('X-Foo');
    expect(foo.value).toEqual('bar');

  });


  test('extracts body without headers', () => {
    const result = extractData(`
GET http://google.com
    
body1
body2
`);

    expect(result.body).toEqual(`body1\nbody2`);

  });

  test('extracts body with headers', () => {
    const result = extractData(`
    GET http://google.com
    Foo: bar
    A: b
    
body1
body2
`);

    expect(result.body).toEqual(`body1\nbody2`);

  });


});
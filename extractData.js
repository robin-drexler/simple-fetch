function getMethodAndUrlFromRequestLine(requestLine) {
  if (requestLine.length === 1) {
    return {
      method: 'GET',
      url: requestLine[0]
    }
  }

  return {
    method: requestLine[0],
    url: requestLine[1]
  }
}

module.exports = function (string) {
  string = string.trim();
  let split = string.split("\n");
  const requestLine = split.shift().split(' ');

  const { method, url } = getMethodAndUrlFromRequestLine(requestLine);

  let body = '';
  let headers = [];

  if (!split.length) {
    return {
      method,
      url,
      headers,
      body
    }
  }


  // next line is not empty
  const hasHeaders = !!split[0].trim();
  let bodyStartIndex = 0;

  if (hasHeaders) {
    split.every((header, index) => {
      bodyStartIndex = index;

      header = header.trim();
      if (header == '') {
        return false;
      }
      const [key, value] = header.split(':');
      headers.push({
        key: key.trim(),
        value: value.trim()
      });
      return true;
    });

  }

  split = split.slice(bodyStartIndex + 1);

  if (split.length) {
    body = [...split].join("\n").trim();
  }


  return {
    method,
    url,
    headers: headers,
    body: body,
  }
}
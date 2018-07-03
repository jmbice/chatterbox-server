
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var headers = defaultCorsHeaders;
var data = {
  results: [
    {
      username: 'bob',
      text: 'hi frank',
    },
    {
      username: 'frank',
      text: 'hi bob',
    },
    {
      username: 'joe',
      text: 'hi joe',
    }
  ]
};


var requestHandler = function(request, response) {
  var statusCode;


  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  if (request.method === "GET") {
    if ('/classes/messages' === request.url || '/?order=-createdAt' === request.url) {
      statusCode = 200;
    } else {
      statusCode = 404;
    }
    headers['Content-Type'] = 'application/json';
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));

  } else if (request.method === "POST" && (request.url === '/classes/messages' || '/?order=-createdAt' === request.url)) {
    let body = '';
    console.log("who cares about status code: ", request);
    request.on('error', (err) => {
      console.log(err.stack);
    }).on('data', (chunk) => {
      body += chunk; 
    }).on('end', () => {
      data.results.push(JSON.parse(body));
      statusCode = 201;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      console.log('is it too slow though');
      response.end();
    });
    
  } else if (request.method === "OPTIONS") {
    headers['Content-Type'] = 'application/json';
    response.writeHead(statusCode, headers);
    response.end();
    
  } else {
    console.log ('Error: ' + request.method + ' is not recognized.');
  }
   
};


exports.requestHandler = requestHandler;

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
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
  var headers = defaultCorsHeaders;


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

  } else if (request.method === "POST" ) {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk; 
    }).on('end', () => {
      data.results.push(JSON.parse(body));
      statusCode = 201;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data));
    });
    
  } else if (request.method === "OPTIONS") {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
    
  } else {
    console.log ('Error: ' + request.method + ' is not recognized.');
  }
   
};


exports.requestHandler = requestHandler;

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var headers = defaultCorsHeaders;
var data = {
  results: [
    // {
    //   username: 'bob',
    //   text: 'hi frank',
    //   roomname: 'the interwebs',
    //   createdAt: '2018-07-02T18:32:45.273Z',
    //   updatedAt: '2018-07-02T18:32:45.273Z'
    // },
    // {
    //   username: 'frank',
    //   text: 'hi bob',
    //   roomname: 'the interwebs',
    //   createdAt: '2018-06-02T18:32:45.273Z',
    //   updatedAt: '2018-06-02T18:32:45.273Z'
    // },
    // {
    //   username: 'joe',
    //   text: 'hi joe',
    //   roomname: 'the interwebs',
    //   createdAt: '2018-05-02T18:32:45.273Z',
    //   updatedAt: '2018-05-02T18:32:45.273Z'
    // }
  ]
};


var requestHandler = function(request, response) {
  var statusCode;


  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  if (request.method === "GET") {
    headers['Content-Type'] = 'application/json';
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));

  } else if (request.method === "POST") {
    headers['Content-Type'] = 'application/json';
    statusCode = 201;
    response.writeHead(statusCode, headers);
    data.results.push(request._postData); 
    console.log(request) 
    response.end(JSON.stringify(data));
    // let body = [];
    // request.on('data', (chunk) => {
    //   body.push(chunk);
      
    // }).on('end', () => {
    //   body = Buffer.concat(body).toString();
    //   console.log(body);
    
    //   data.results.push(JSON.parse(body));
    //   console.log(JSON.parse(body));
    //   response.end(data);
      
    // })
        
    
    
    

    
  } else if (request.method === "OPTIONS") {
    headers['Content-Type'] = 'application/json';
    response.writeHead(statusCode, headers);
    response.end();
    
  } else {
    console.log ('Error: ' + request.method + ' is not recognized.');
  }
   
   
  // response.writeHead(statusCode, headers);
  // response.end('Hello, Mr. Bae & Mr. Bice!');
  
};


exports.requestHandler = requestHandler;
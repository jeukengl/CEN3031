
var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
    // console.log("request Object", request);
  //  console.log("URL", parsedUrl);
    if(request.method === "GET") {
      if(parsedUrl.path === "/listings") {
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = "200";
        response.write(listingData);
        response.end();
      }
      else {
        response.statusCode = "404"; 
        response.write("Bad gateway error");
        response.end();
      }
    }
    else {
      response.statusCode = "404"; 
      response.end(); 
    }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   if(err) {
    console.log("There was an error reading the file listings.json");
    return;
   }
   else {
    // Save the data passed to this function into listingData
    // console.log(data);
    listingData = data;
    var server = http.createServer(requestHandler);
    server.listen("8080", function() {
      //once the server is listening, this callback function is executed
      console.log('Server listening on: http://127.0.0.1:' + port);
    });
   }
});

import http from 'http';
import https from 'https';

export function runServer(app, credentials, cb, httpPort = 80, httpsPort = 443){
  //var httpServer = http.createServer(app);
  var httpServer = http.createServer(function (req, res) {
    let host = req.headers.host;
    if(!host){
      res.writeHead(400, {});
      return res.end();
    }
    let newHost = host.replace(':' + httpPort, ':' + httpsPort);
    res.writeHead(301, { 'Location': 'https://' + newHost + req.url });
    res.end();
  });
  var httpsServer = https.createServer(credentials, app.callback());
  httpServer.listen(httpPort, function() {
    httpsServer.listen(httpsPort, function() {
      if(cb){
        cb(httpServer, httpsServer);
      }
    });
  });
}

import path from 'path';

let credentialFiles = {
  basePath: path.join(__dirname, '..', 'ssl/production/xxxxxx'),
  key: 'privatekey.pem',
  cert: 'certificate.pem',
};

let httpPort = 80;
let httpsPort = 443;

export {
  credentialFiles,
  httpPort,
  httpsPort,
};

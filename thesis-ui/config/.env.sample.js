const envBuild = {
  server: ['PORT=1337'],
  client: [
    'NODE_ENV=DEVELOPMENT',
    'DEBUG=TRUE',
    'ENVPREFIX=REACT_APP_',
    'REST_SERVER_URL=https://swapn.online',
    'SOCKET_SERVER_URL=https://swapn.online/socket.io',
    'S3_SERVER_URL=https://swapn.online/s3',
    // 'CODERUNNER_SERVICE_URL=http://localhost:4000',
    // 'REACT_APP_SOCKET_SERVER_URL=http://localhost:4155',
    // 'REACT_APP_REST_SERVER_URL=http://localhost:4990'
  ],
};

module.exports = envBuild;

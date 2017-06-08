// ===================================================
// FOR PRODUCTION
// Total.js - framework for Node.js platform
// https://www.totaljs.com
// ===================================================

const options = {};

// options.ip = '127.0.0.1';
// options.port = parseInt(process.argv[2]);
// options.config = { name: 'total.js' };
// options.https = { key: fs.readFileSync('keys/agent2-key.pem'), cert: fs.readFileSync('keys/agent2-cert.pem')};

options.ip = process.env.IP || '0.0.0.0';
options.port = process.env.PORT || 8000;

/**
 * Release notes:
 */

require('total.js').http('release', options);
// require('total.js').cluster.http(5, 'release', options);
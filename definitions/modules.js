F.on('load', function () {
// Model product
    F.install('model', 'http://modules.tomanage.fr/models/latest/product.js');

// WebCounter module
    F.install('module', 'https://modules.totaljs.com/latest/webcounter.js');
// Request stats module
    F.install('module', 'https://modules.totaljs.com/latest/reqstats.js');
// Total.js monitoring
    F.install('module', 'https://modules.totaljs.com/latest/monitor.js');
});
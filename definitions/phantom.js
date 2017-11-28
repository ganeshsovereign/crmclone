"use strict";

const Fs = require('fs');

NEWOPERATION('pdf', function(error, value, callback) {

		// value.url           - {String}, absolute URL
		// value.filename      - {String}, absolute path
		// value.width         - {Number}, browser width - default: 1280
		// value.height        - {Number}, browser height - default: 1024
		// value.format        - {String}, default: "A4"
		// value.orientation   - {String}, default: "portrait"
		// value.timeout       - {Number}, default: 200

		const phantomjs = require('phantomjs-prebuilt');
		var program = phantomjs.exec(F.path.temp('pdf.js'), value.url, value.filename, value.format || 'A4', (value.width || '1280') + 'x' + (value.height || '1024'), value.orientation || 'portrait', value.timeout || 200);
		program.stdout.pipe(process.stdout);
		program.stderr.pipe(process.stderr);
		program.on('exit', code => {
				callback(code, value.filename);
				// do something on end
		});
});


// Creates a "phantom" script into the temporary directory
/*Fs.writeFileSync(F.path.temp("pdf.js"), "var P=require('webpage').create();var S=require('system');console.log(S.args);var size=(S.args[4]||'').split('x');P.viewportSize={width:parseInt(size[0]||'1280'),height:parseInt(size[1]||'1024')};P.paperSize={format:S.args[3]||'A4',orientation:S.args[5]||'portrait'};P.clipRect={top:0,left:0,width:P.viewportSize.width,height:P.viewportSize.height};P.open(S.args[1],function(status){if(status!=='success'){phantom.exit(1);return}window.setTimeout(function(){P.render(S.args[2]);phantom.exit()},parseInt(S.args[6] || '200'))});");

// Creating PDF
OPERATION('pdf', { url: 'http://en.wikipedia.org/w/index.php?title=Jakarta&printable=yes', filename: F.path.public('totaljs.pdf') }, function(err, filename) {
console.log(err, filename);
});*/
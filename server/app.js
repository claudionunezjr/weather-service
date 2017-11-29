const express = require('express');
const request = require('request');

const app = express();
const port = (process.env.PORT || 8080);

// Would store the secret key in a protected folder/file & access via environment variable.
const secretKey = '868da9a2558f857964c46faccd24ce40';
const baseUrl = `https://api.darksky.net/forecast/${ secretKey }/`;

// RESTful GET endpoint
// Access & return weather data based on 1 week ago.
app.get('/last-week/:longlat', function(req, response) {
    const longlat = req.params.longlat;
    const timeWeekMs = (7 * 24 * 60 * 60) * 1000;
    const timeLastWeekUtc = Date.now() - timeWeekMs;
    const timeLastWeekUnix = Math.round(timeLastWeekUtc / 1000);
    const requestUrl = `${ baseUrl }${ longlat },${ timeLastWeekUnix }`;

    // Make the request to Dark Sky & return the response data.
    request(requestUrl, function(err, req, res) {
        let body;

        if (err) {
            body = err;
        } else {
            body = res;
        }

        console.info('response: ', res);
        response.send(body);
    });
});

// 404 Message for undefined URL's.
app.get('**', function(request, response) {
    response.send('404: Oops, the page you\'re trying to reach does not exist.');
});

// Listen on set PORT (open connection.)
app.listen(port);

console.log('App server listening on port:', port);
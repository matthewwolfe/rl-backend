const fs = require('fs');


function view(response, file, data) {
    fs.readFile(`application/views/${file}`, (error, html) => {
        if (error) {
            response.status(404).send('Could not be found');
        }

        html = html.toString();

        for (const variable in data) {
            html = html.replace(`{${variable}}`, data[variable]);
        }

        response.status(200).send(html);
    });
}

module.exports = view;

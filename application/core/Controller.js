const fs = require('fs');
const Validation = require('application/libraries/Validation');


class Controller {

    validate(data, ruleset) {
        const validator = new Validation();
        validator.run(data, ruleset);
    }

    view(response, file, data) {
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
}

module.exports = Controller;

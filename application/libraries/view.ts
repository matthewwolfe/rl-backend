import fs from 'fs';


function view(response, file, data) {
    fs.readFile(`application/views/${file}`, (error, html) => {
        if (error) {
            response.status(404).send('Could not be found');
        }

        let htmlString = html.toString();

        for (const variable in data) {
            htmlString = htmlString.replace(`{${variable}}`, data[variable]);
        }

        response.status(200).send(htmlString);
    });
}

export {
    view
};

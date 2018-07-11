const language = 'english';


function lang(path, options = {})
{
    const fileName = path.slice(0, path.indexOf('.'));
    const property = path.slice(path.indexOf('.') + 1, path.length);

    var json = require(`i18n/${language}/${fileName}`).default;
    return translate(json[property], options);
}

function translate(string, options)
{
    Object.keys(options).forEach(option => {
        string = string.replace(`{${option}}`, options[option]);
    });

    return string;
}

export {
    lang
};

const validator = require('validator');
const ValidationError = require('errors/ValidationError');
const lang = require('libraries/lang');
const capitalize = require('libraries/string').capitalize;


function run(data, validation) {
    const errors = [];

    for (const property in validation) {
        const rules = validation[property];

        rules.forEach((rule) => {
            let value = data[property];

            // Don't convert values for custom rules to string, because then other data types can be validated
            if (!customRules.hasOwnProperty(rule.rule.name)) {
                value = value + '';
            }

            if (rule.rule(value, rule.options) === false) {
                errors.push({
                    name: property,
                    rule: rule.rule.name,
                    options: rule.options
                });
            }
        });
    }

    if (errors.length) {
        throw new ValidationError(transformErrors(errors));
    }
}

function transformErrors(errors) {
    return errors.map(error => {
        const options = error.options ? `.${Object.keys(error.options).join('.')}` : '';

        return lang(`validation.${error.rule}${options}`, {
            ...error.options,
            name: capitalize(error.name)
        });
    });
}

function isArray(value) {
    return Array.isArray(value);
}

function isPresent(value) {
    return value !== undefined && value !== null;
}

function isRequired(value) {
    return isPresent(value) && !!value;
}

const customRules = {
    isArray: isArray,
    isPresent: isPresent,
    isRequired: isRequired
};

module.exports = {
    run,
    rules: Object.assign({}, validator, customRules)
};

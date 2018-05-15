const ValidationError = require('application/errors/ValidationError');
const lang = require('application/libraries/lang');
const capitalize = require('application/libraries/string').capitalize;


function run(data, validation) {
    const errors = [];

    for (const property in validation) {
        const rules = validation[property];

        rules.forEach((rule) => {
            if (rule.rule(data[property] + '', rule.options) === false) {
                errors.push({
                    name: property,
                    rule: rule.rule.name,
                    options: rule.options
                });
            }
        });
    }

    if (errors.length) {
        throw new ValidationError(this.transformErrors(errors));
    }
}

function transformErrors(errors) {
    return errors.map(error =>
        lang(`validation.${error.rule}.${Object.keys(error.options).join('.')}`, {
            ...error.options,
            name: capitalize(error.name)
        })
    );
}

module.exports = {
    run
};

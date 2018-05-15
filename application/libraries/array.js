function keyBy(array, property) {
    const object = {};

    array.forEach((element) => {
        object[element[property]] = element;
    });

    return object;
}

module.exports = {
    keyBy
};

const mongoose = require('mongoose');

const createConnection = (successCallback, errorCallback) => {
    mongoose.
        connect('mongodb://127.0.0.1:27017/test').
            then(() => {
                typeof successCallback === 'function' && successCallback();
            }).
            catch(error => {
                typeof errorCallback === 'function' && errorCallback();
    })
}

module.exports = {
    createConnection,
}
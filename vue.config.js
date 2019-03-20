const path = require('path');
module.exports = {
    css: {
        loaderOptions: {
            less: {
                paths: [
                    path.resolve(__dirname, 'styles')
                ]
            },
        }
    }
};
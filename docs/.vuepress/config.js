const path = require('path');
module.exports = {
    base: '/gulu/',
    title: '轱辘UI',
    description: '一个好用的UI框架',
    themeConfig: {
        sidebar: [
            {
                title: '入门',
                collapsable: false,
                children: [
                    '/',
                    '/install/',
                    '/get-start/',
                ]
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/components/button',
                    '/components/popover',
                    '/components/toast',
                    '/components/uploader'

                ]
            },
        ]
    },
    less: {
        loader: 'less-loader',
        paths: [
            path.resolve(__dirname, 'styles')
        ]
    },

};
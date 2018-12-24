export default {
    context: {
        title: "LivAway"
    },
    plugins: [
        'axios',
        'md5'
    ],

    proxy: {
        "/static/": {
            "target": "http://localhost:8000/",
            "changeOrigin": true,
            "history": '',
            "pathRewrite": { "^/static": "" }
        }
    }
}
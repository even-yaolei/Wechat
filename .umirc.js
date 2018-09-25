export default {
    context: {
        title:"LivAway"
    },
    plugins: [
      'axios'
    ],
    hashHistory:false,
    proxy: {
        "/static/": {
            "target": "http://localhost:8000/",
            "changeOrigin": true,
            "pathRewrite": { "^/static" : "" }
        }
    }
}
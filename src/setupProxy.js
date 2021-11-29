const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		createProxyMiddleware(['!/sockjs-node', '/api/*', '/socket.io/**'], {
			target: 'http://localhost:8080',
			secure: false,
			changeOrigin: true,
			ws: true,
		})
	)
}

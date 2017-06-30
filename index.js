import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

import configFn from './webpack.config.babel.js'

const PORT = process.env.PORT || 3000
const app = express()

const config = configFn()
const compiler = webpack(config)
const middleware = webpackMiddleware(compiler)

// webpack deps
app.use(middleware)

app.get('*', (req,res) => {
  res.set('Content-Type', 'text/html')
  res.send(middleware.fileSystem.readFileSync(config.output.path + '/index.html'))
})

app.listen(PORT, (err) => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

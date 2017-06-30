import webpack from 'webpack'
import path from 'path'
import HTML from 'html-webpack-plugin'
import HTMLtemplate from 'html-webpack-template'
import Extract from 'extract-text-webpack-plugin'
import copy from 'copy-webpack-plugin'

export default env => {
  const plugins = [
    new Extract('[contenthash].css')
  ]

  if (env === 'prod') {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      })
    )
  }

  plugins.push(new HTML({
    inject: false,
    title: 'Mapping the NSW Budget 2017-18',
    template: HTMLtemplate,
    googleAnalytics: {
      trackingId: 'UA-52007710-1',
      pageViewOnLoad: true
    },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { name: 'description', content: 'The 2017-18 Budget continues the record program with capital spend of $72.7 billion in the four years to 2020-21. The Government’s commitment in 2017-18 is $22.3 billion. This includes major infrastructure projects and programs to realise opportunities for economic growth and provide for our local communities. Mapping the Budget highlights the key areas of spend.' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Mapping the NSW Budget 2017-18' },
      { name: 'twitter:description', content: 'The 2017-18 Budget continues the record program with capital spend of $72.7 billion in the four years to 2020-21. The Government’s commitment in 2017-18 is $22.3 billion. This includes major infrastructure projects and programs to realise opportunities for economic growth and provide for our local communities. Mapping the Budget highlights the key areas of spend.' },
      { name: 'twitter:image', content: '/screenshot.png' },
      { property: 'og:title', content: 'Mapping the NSW Budget 2017-18' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://myinfrastructure.planning.nsw.gov.au' },
      { property: 'og:image', content: '/screenshot.png' },
      { property: 'twitter:description', content: 'The 2017-18 Budget continues the record program with capital spend of $72.7 billion in the four years to 2020-21. The Government’s commitment in 2017-18 is $22.3 billion. This includes major infrastructure projects and programs to realise opportunities for economic growth and provide for our local communities. Mapping the Budget highlights the key areas of spend.' }
    ]
  }))

  plugins.push(new copy([{
    from: './images'
  }]))

  return {
    devtool: env === 'prod' ? 'source-map' : 'eval',
    entry: './src/index.js',
    output: {
      filename: '[name].[chunkhash].js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      modules: [
        path.join(__dirname, 'src'),
        'node_modules'
      ]
      // alias: {
      //   react: 'preact-compat',
      //   'react-dom': 'preact-compat',
      //   'create-react-class': 'preact-compat/lib/create-react-class'
      // }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ["es2015", { modules: false }],
                "react",
                "stage-0"
              ]
            }
          }]
        },
        {
          test: /\.(css)$/,
          include: path.resolve(__dirname, 'src'),
          use: Extract.extract({
            fallback: 'style-loader',
            use: 'css-loader?modules'
          })
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'node_modules', 'leaflet'),
          use: Extract.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.(?:png|jpg|svg|json|csv)/,
          include: [
            path.resolve(__dirname),
          ],
          exclude: [
            path.resolve(__dirname, 'src/messages.json'),
            path.resolve(__dirname, 'src/old_budget.json')
          ],
          use: 'file-loader'
        },
        {
          test: /\.(?:ttf|svg|woff2?|eot)$/,
          loader: 'file-loader',
          include: path.resolve(__dirname, 'fonts'),
        },
      ]
    },
    plugins
    // stats: 'errors-only'
  }
}

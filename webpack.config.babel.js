import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import prefix from 'autoprefixer'
import nest from 'postcss-nested'
import lost from 'lost'
import values from 'postcss-modules-values'

module.exports = {
	cache: true,
	entry: ['./src/index.js'],
	output:{
		path: path.join(__dirname, 'dist'),
		publicPath: "",
		filename: "index.js",
		chunkFilename: "[chunkhash].js"
	},
	module:{
		loaders:[
			{
				test: /\.coffee$/,
				loader: 'coffee-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel'
			},
			{
				test: /\.css/,
				loader:ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1!postcss-loader")
			},
			{
				test: /\.styl/,
				loader:ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!stylus-loader")
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=100000&mimetype=image/png'
			},
			{
				test: /\.woff$/,
				loader: 'url-loader?limit=10000&minetype=application/font-woff'
			},
			{ test: /\.ttf$/,    loader: "file-loader" },
			{ test: /\.eot$/,    loader: "file-loader" },
			{ test: /\.svg$/,    loader: "file-loader" },
			{ test: /\.json$/,    loader: "file-loader" },
			{ test: /\.gif$/,    loader: "file-loader" },
			{ test: /\.csv$/,    loader: "file-loader" }
		]
	},
	resolve:{
		entensions:	["", ".js",".coffee"],
		modulesDirectories: ['node_modules']
	},
	plugins:[
		new ExtractTextPlugin('index.css')
	],
	postcss: [
		values,
		prefix(),
		nest(),
		lost()
	]
}

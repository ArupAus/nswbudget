import gulp from 'gulp'
import gutil from 'gulp-util'
import React from 'react'
import replace from 'gulp-replace'
import clean from 'gulp-clean'
import jade from 'gulp-jade'
import stylus from 'gulp-stylus'

import webpack from 'webpack'
import WebpackDevServer from  'webpack-dev-server'

import config from  './webpack.config.babel.js'
import process from './process.js'
let options = {}

gulp.task("default", ['process', 'html'])
gulp.task("process", ['webpack'], process)

gulp.task("watch", ['webpack-dev-server'])

gulp.task('clean', () =>	(
	gulp.src('dist', {read:false})
		.pipe(clean())
))

gulp.task('html', ['clean'], () => {

	gulp.src('src/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('dist'))

	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))

	gulp.src('src/images/screenshot.png')
		.pipe(gulp.dest('dist'))

	gulp.src('src/images/page.png')
		.pipe(gulp.dest('dist'))

	gulp.src('src/images/icons/*.png')
		.pipe(gulp.dest('dist/images/icons'))

})

gulp.task("webpack", ['clean'], (done) => {
	webpack(config, (err, stats) => {
		if (err) {
			throw new gutil.PluginError("webpack", err)
		}
		gutil.log('[webpack]', stats.toString())
		done()
	})
})

gulp.task('webpack-dev-server', ['clean'], (done) => {

	gulp.src('index.html')
		.pipe(gulp.dest('dist'))

	var compiler = webpack(config)

	new WebpackDevServer(compiler, options)
		.listen(8080, "localhost", err => {
			if (err) {
				throw new gutil.PluginError("webpack-dev-server", err)
			}
			gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html")
		})
})
// # this will prerender the app to index.html... make sure we have a '<!-- content -->' tag
// gulp.task 'prerender', ['clean'], ->
// 	gulp.src 'src/index.jade'
// 		.pipe jade()
// 		# .pipe replace '<!-- content-->', React.renderComponentToString require('./src/App.coffee')()
// 		.pipe gulp.dest 'dist'

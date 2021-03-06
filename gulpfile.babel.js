import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();


import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import optionsWebpackConfig from './options/webpack.config';

gulp.task('popup-js', ['clean'], (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('event-js', ['clean'], (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('options-js', ['clean'], (cb) => {
  webpack(optionsWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', ['clean'], () => {
  return gulp.src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('options-html', ['clean'], () => {
  return gulp.src('options/src/index.html')
    .pipe(plugins.rename('options.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-icon', ['clean'], () => {
  return gulp.src('img/logoBeta128.png')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-full-icon', ['clean'], () => {
  return gulp.src('img/logoFullDark.svg')
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'popup-js', 'popup-html', 'event-js', 'options-js', 'options-html', 'copy-icon', 'copy-full-icon']);

gulp.task('watch', ['default'], () => {
  gulp.watch('popup/**/*', ['build']);
  gulp.watch('event/**/*', ['build']);
  gulp.watch('options/**/*', ['build']);
});

gulp.task('default', ['build']);

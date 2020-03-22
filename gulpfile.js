const gulp = require('gulp')
const babel = require("gulp-babel");
const plumber = require('gulp-plumber')
const less = require('gulp-less')
const terser = require('gulp-terser')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat-css')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const server = require('browser-sync').create()

gulp.task('css', function () {
  return gulp.src('less/**/*.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(rename({
      suffix: '-min',
      extname: '.css'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(server.stream())
})

gulp.task('js', function () {
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              "presets": [
                ["@babel/preset-env", {
                  "targets": {
                    "browsers": ["ie >= 11"]
                  },
                  "corejs": 3,
                  "debug": true,
                  "useBuiltIns": "usage"
                }],
              ]
            }
          }
        ]
      }
    }))
    .pipe(terser())
    .pipe(rename({
      suffix: '-min',
      extname: '.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js'))
})

gulp.task('serve', function () {
  server.init({
    server: {
      baseDir: './',
    }
  })

  gulp.watch('less/**/*.less', gulp.series('css'))
  // gulp.watch('js/**/*.js', gulp.series('js'))
  gulp.watch('**/*.html').on('change', server.reload)
})

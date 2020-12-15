const createError = require('http-errors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/** MIDDLEWARE */
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const cors = require('cors');
const bodyParser = require('body-parser');
// require('./socket/socket');

/** ROUTES */
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const imagesRouter = require('./routes/images');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/** MIDDLEWARE */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));
app.use(favicon(__dirname + '/public/favicon.ico'));

/** ROUTES */
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/images', imagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
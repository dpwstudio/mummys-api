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
const logSymbols = require('log-symbols');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db/db');
// require('./socket/socket');

/** ROUTES */
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const certificatesRouter = require('./routes/certificates');
const propertiesRouter = require('./routes/properties');
const transfersRouter = require('./routes/transfers');
const uploadFileRouter = require('./routes/upload');
const picturesRouter = require('./routes/pictures');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/** MIDDLEWARE */
// enable files upload
// app.use(fileUpload({
//   createParentPath: true,
//   limits: {
//     fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
//   },
// }));
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
app.use('/certificates', certificatesRouter);
app.use('/properties', propertiesRouter);
app.use('/transfers', transfersRouter);
app.use('/upload', uploadFileRouter);
app.use('/pictures', picturesRouter);

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
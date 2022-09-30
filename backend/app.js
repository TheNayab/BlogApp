var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var UserRoute = require("./routes/User_route");
var BlogRoute = require("./routes/Blog_router");
var cors = require("cors");
var app = express();
app.use(cors());
// "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/BLOG?",{
    useNewUrlParser:true,
    useUnifiedTopology:true

  })
  
  mongoose.connection.on('connected',()=>{
    console.log("mongoose is connected !!!!")
  })
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
  }

// const MONGOOSE_URI =
//   "mongodb+srv://nayab:Nayab100333-@cluster0.ir9lk6a.mongodb.net/BLOG?retryWrites=true&w=majority";
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(MONGOOSE_URI, {
//       useUnifiedTopology: false,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.bold);
//     process.exit();
//   }
// };
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     req.header("Access-Contorl-Allow-Methods", "PUT,PATCH,GET,DELETE,POST");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/blog", BlogRoute);
app.use("/user", UserRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
  res.render("error");
});

module.exports = app;

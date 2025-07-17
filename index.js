const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const User = require("./models/user.js");
const Message = require("./models/message.js");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
dotenv.config();

const methodOverride = require("method-override");
const aidsRoutes = require("./routes/aids.js");
const usersRoutes = require('./routes/users');
const partUserRoutes = require('./routes/particularuser.js')
const chatRoutes = require('./routes/chat.js');
const http = require('http');
const socketio = require('socket.io');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

const server = http.createServer(app);
const io = socketio(server);

const port = 8000;
server.listen(port, () => {
  console.log(`server running on https://localhost/:${port}/`);
})


const dbUrl = 'mongodb://127.0.0.1/War'
const sessionOptions = {
  secret: 'Mysupersecret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL, 
    collectionName: 'sessions'
  }),
  cookie: {
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,

  }
}
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user || null;
  next();
})

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.log("❌ MongoDB connection failed:", err);
  }
}
main();


app.use('/aids',aidsRoutes);
app.use('/users',usersRoutes);
app.use('/chat', chatRoutes);
app.use('/users/:id',partUserRoutes);

app.get("/",(req,res)=>{
  res.render('./aids/index.ejs');
})

app.use((err, req, res, next) => {
  let { status = 500, message = 'something went wrong' } = err;
  res.render("./aids/error.ejs",{message});
})

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('send_message', async (data) => {
   
    const msg = new Message({
      from: new mongoose.Types.ObjectId(data.from),
      to:  new mongoose.Types.ObjectId(data.to),
      message: data.message || "test",
      time: new Date()
    });
    await msg.save();
   

    io.to(data.to).emit('receive_message', data);
    io.to(data.from).emit('receive_message', { ...data, outgoing: true });
  });
});


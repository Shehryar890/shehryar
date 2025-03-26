const dotenv =  require("dotenv").config({ path: "./.env" });

const cors = require('cors');
const express = require('express');
const compression = require('compression');





const app = express();
const http = require('http'); 


// Required to integrate with socket.io



const mongoose = require('mongoose');
const shoprouter = require('./routes/shop');
const tokenroute = require("./routes/token");
const cookieParser = require('cookie-parser');
const cartrouter = require('./routes/cart');
const path = require('path');
const authRoute = require('./routes/auth');
const passport = require('passport');
const googleRoute = require('./routes/outh');
const contactRoute = require('./routes/contact');
const allproductsRoute = require('./routes/allproducts');
const orderRoute = require('./routes/order');
const reviewRoute = require('./routes/review');

const logoutroute = require("./routes/logout")
const items = require('./routes/salefeatures');
const blogginRoutes = require('./routes/bloggin');
const adminRoutes = require('./routes/adminroutes');
 const productSaveRoute = require('./routes/savingproduct');
require("./config/passport");



 const PORT = process.env.PORT  || 8080;


// MongoDB connection
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URL;
    if (!dbURI) {
      console.error('MongoDB URL not found in .env file');
      process.exit(1); // Exit if MongoDB URL is not defined
    }

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit if connection fails
  }
};


// Call the connectDB function
connectDB();
const corsOptions = {
  origin: "http://localhost:5173", // Only allow requests from your frontend
  credentials: true, // Allow cookies and authentication headers
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));



// Add compression middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use(cookieParser());
app.use(passport.initialize());

// Middleware











app.use(passport.initialize());
// Routes
app.use('/auth', authRoute)
app.use('/outh', googleRoute);
app.use('/token', tokenroute);

app.use('/contact', contactRoute);
app.use('/shop', shoprouter);
app.use('/products', allproductsRoute);
app.use('/cart', cartrouter);
app.use('/logout', logoutroute)

app.use('/salefeatures', items);
app.use('/orders', orderRoute);
 
app.use("/create", (req, res, next) => {
  console.log("✅ Route /create is being accessed");
  console.log("📩 Request Headers:", req.headers);
  console.log("📂 Request Body:", req.body);
  console.log("📷 Request Files:", req.files);
  next();
}, productSaveRoute);


 

app.use('/review', reviewRoute);

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);


// Real-time communication with Socket.IO



// Default route
app.get('/', (req, res) => {
  res.send('<h1>Server is running on http://localhost:8000</h1>');
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

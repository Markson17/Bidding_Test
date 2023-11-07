// Cloudinary config goes under here
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'YOUR CLOUDINARY NAME',
  api_key: process.env.CLOUD_API_KEY || 'YOUR CLOUDINARY API_KEY',
  api_secret: process.env.CLOUD_API_SECRET || 'YOUR CLOUDINARY SECRETE',
});

module.exports = cloudinary;

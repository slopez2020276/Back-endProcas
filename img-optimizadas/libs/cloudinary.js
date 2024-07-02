const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dtofliv3j',
  api_key: '394542652279845',
  api_secret:'FrHD-QYhM2r17yfK8oLW3uvnbKM'
});

module.exports = cloudinary;
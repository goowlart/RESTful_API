const fs = require('fs');
const path = require('path');

module.exports = app => {
  fs
  .readdirSync(__dirname)// read a directory
  .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))// do not read files that start with dot
  .forEach (file => require(path.resolve(__dirname, file))(app));// it traverses all my files and applies the application configuration
};
// comi

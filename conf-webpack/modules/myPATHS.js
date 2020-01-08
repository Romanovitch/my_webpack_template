const path = require('path')

module.exports = {
  src: path.join(__dirname, '../../src'),
  anyPages: path.join(__dirname, '../../src/pages'),
  dist: path.join(__dirname, '../../dist'),
  assets: 'assets/'
}

// module.exports = function () {
//   return PATHS = {
//       src: path.join(__dirname, '../../src'),
//       dist: path.join(__dirname, '../../dist'),
//       assets: 'assets/'
//     }
// }
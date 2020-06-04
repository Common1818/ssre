"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssrapp = void 0;

var _express = _interopRequireDefault(require("express"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _App = _interopRequireDefault(require("./src/App"));

var functions = _interopRequireWildcard(require("firebase-functions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path");

var fs = require("fs");

var app = (0, _express.default)(); // var BUILD_DIR = path.join(__dirname, 'build')
// app.use(express.static(BUILD_DIR))

app.get('**', function (req, res) {
  console.log("working");

  var html = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_App.default, null));

  console.log(html);
  var filePath = path.resolve(__dirname, 'index.html');
  var index = fs.readFileSync(filePath, 'utf8');
  index = index.toString();
  console.log(index);
  var finalHtml = index.replace("<!---- ::APP:: ---->", html);
  console.log(finalHtml); // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')

  res.send(finalHtml);
  console.log("send");
});
var ssrapp = functions.https.onRequest(app); // const router = express.Router();
// router.use('**', (req, res) => {
//     console.log("working")
//     // point to the html file created by CRA's build tool
//     const filePath = path.resolve(__dirname, 'build', 'index.html');
//     fs.readFile(filePath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('err', err);
//             return res.status(404).end()
//         }
//         // render the app as a string
//         const html = ReactDOMServer.renderToString(<App />);
//         // inject the rendered app into our html and send it
//         return res.send(
//             htmlData.replace(
//                 '<div id="root"></div>',
//                 `<div id="root">${html}</div>`
//             )
//         );
//     });
//     }
// );
// router.use(express.static(
//     path.resolve(__dirname, 'build'),
//     { maxAge: '30d' },
// ));
// app.use(router);

exports.ssrapp = ssrapp;
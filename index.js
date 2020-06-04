import express from 'express';
import  React  from "react";
import ReactDOMServer from 'react-dom/server'
import App from './src/App';
import * as functions from 'firebase-functions';

const path = require("path");
const fs = require("fs");

const app = express();
// var BUILD_DIR = path.join(__dirname, 'build')

// app.use(express.static(BUILD_DIR))

app.get('**',(req, res) => {
    console.log("working")

      const html = ReactDOMServer.renderToString(<App/>);
      console.log(html)
      const filePath = path.resolve(__dirname, 'index.html');

      let index =  fs.readFileSync(filePath, 'utf8');
      index = index.toString()
      console.log(index)
      const finalHtml = index.replace( "<!---- ::APP:: ---->", html) 
      console.log(finalHtml)
      // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
      res.send(finalHtml);   
      console.log("send")
    
  })
export let ssrapp = functions.https.onRequest(app);

// const router = express.Router();

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
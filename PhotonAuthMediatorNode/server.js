'use strict';
var http = require('http');
var port = process.env.PORT || 3000;

const express = require("express");
const /*{ initializeApp }*/ admin = require('firebase-admin/app');

const app = express();
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

const firebaseApp = admin.initializeApp({              //use env var for service account json file path
    credential: admin.credential.applicationDefault()
});

const auth = getAuth(firebaseApp);


app.get("/auth", (req, res) => {

    const token = req.body.token;

    if (!token) {
        return res.json(
            {
                ResultCode: 3,
                Message: "invalid request!"
            })
    }

    auth.verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;

            return res.json({
                ResultCode: 2,
                Message: "Auth success!"
            });
            // ...
        })
        .catch((error) => {
            //could add manual loging here for errors

            return res.json({
                ResultCode: 2,
                Message: "Something went wrong! Please try again!"
            });
        });
});

app.listen(port);


//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

//http.get()
/*
 * 
   getAuth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    // ...
  })
  .catch((error) => {
    // Handle error
  });
 */
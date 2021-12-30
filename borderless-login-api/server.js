const express=require('express')
const port = process.env.PORT || 3000
const compression=require('compression')
const path=require('path');
const app = express()
app.use(express.urlencoded())
app.use(express.json());
// view engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
});
let db=admin.firestore();
let a=db.collection('users')
app.post('/user',async (req,res)=>{
let docRef=a.doc(req.body.user.email)
await docRef.set({
email: req.body.user.email,
fName: req.body.user.fName,
lName: req.body.user.lName,
phone: req.body.user.phone,
});
res.send('done');
})
app.listen(port, (req,res)=>{
console.info(`Running on ${port}`)
})
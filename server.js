const express = require("express");
const app = express();
var nodeMailer = require('./rq/produceQ.js')

app.get('/',(req,res)=>{
res.status(200).json({working:true});
});
app.get('/sendmail',(req,res)=>{
let mail = {
	from: '"Support" <support@manoj.in>',
	to: "manoj27.rgukt@gmail.com",
    	subject: 'Some subject here',
    	text:'Hello from selekt.in',
    	html: '<h1>our template here</h1>',
}
nodeMailer(mail,'mails');
res.status(200).json({working:true});
});
var mailsSender1 = require('./rq/consumeQ.js')('mails')
app.listen(2728, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`App listening on port: 1366`);
    }
});

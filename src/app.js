const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
require('dotenv').config();



const app = express();

app.use(express.static('src/assets'));
app.use(bodyParser.urlencoded({ extended: true }));



mailchimp.setConfig({
    apiKey:process.env.Key,
    server: process.env.SERVER,
});

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html')
    

})

app.post('/', function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;


    async function run() {
        const response = await mailchimp.lists.addListMember(process.env.LIST, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname,
            }
        });
    }


        res.sendFile(__dirname + '/sucess.html');

    run().catch(e => res.sendFile(__dirname + "/failure.html"));

});



app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running...');
});

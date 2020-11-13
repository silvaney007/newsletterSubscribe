const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");



const app = express();

app.use(express.static('src/assets'));
app.use(bodyParser.urlencoded({ extended: true }));



mailchimp.setConfig({
    apiKey: "9659725723125636fd3c6ddad2cab40a-us2",
    server: "us2"
});

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html')
    

})

app.post('/', function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const listId = "9fe867988b";


    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
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

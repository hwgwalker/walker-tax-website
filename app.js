const express = require('express');
const engine = require('ejs-mate');


//For form-to-email:
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require('dotenv').config()
const cors = require("cors");

//so app.get is express.get
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());


//To get EJS working:
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.json())

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/success', (req, res) => {
    res.render('success')
})

// app.post('/', (req, res) => {

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASS
//         }
//     })

//     const mailOptions = {
//         from: req.body.email,
//         to: process.env.EMAIL,
//         subject: `Message from ${req.body.email}: ${req.body.subject}`,
//         text: req.body.message
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.send('error');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('success')
//         }
//     })
// })

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

app.post("/send", (req, res) => {
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });

        //2.
        const mail = {
            sender: `${data.name} <${data.email}>`,
            to: process.env.EMAIL,
            subject: data.subject,
            text: `${data.name} <${data.email}> <${data.phone}> \n${data.message}`,
        };

        //3.
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong.");
            } else {             
                res.redirect('/success')
            }
        });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

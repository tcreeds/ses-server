let AWSSES = require('aws-sdk/clients/ses')
let express = require('express')
let util = require('util')
let app = express()
let bodyparser = require('body-parser')
let ses = new AWSSES()

app.use(bodyparser.json())

app.post('/sendEmail', function(req, res){
    console.log(util.inspect(req.body, false, null))
    let params = {
        Destination: {
            ToAddresses: [req.body.to]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: req.body.body
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: req.body.subject
            }
        },
        Source: req.body.from

    }
    console.log("constructed params")
    ses.sendEmail(params).promise().then(function(data){
        console.log('success: ' + util.inspect(data, false, 3))
        res.send('yup')
    }).catch(function(err) {
        console.log('errored with: ' + util.inspect(err, false, 3))
        res.send('nope')
    })
})



let port = process.env.PORT || 3000
app.listen(port, function(){
    console.log('listening on ' + port)
})

//ses.sendEmail()

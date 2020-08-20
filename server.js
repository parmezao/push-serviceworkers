require('dotenv').config({path: 'variables.env'});

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:wagner@parmex.com.br', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'Notificações Push com Service Workers'
    });

    webPush.sendNotification(subscription, payload)
        .catch(error => console.log(error));
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running in PORT: ${server.address().port}`);
})


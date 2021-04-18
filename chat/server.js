const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(__dirname));
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

const dbUrl = 'mongodb+srv://ezops-test-bruno:Vp-V2TZUH-9JLrj@cluster0.t2a8k.mongodb.net/chat-app?retryWrites=true&w=majority'
const Message = mongoose.model('Message', {
    style: String,
    name: String,
    message: String
})


app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

io.on('connection', () => {
    console.log('a user is connected')
})

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})

const server = http.listen(3000, () => {
    console.log("server is running on port", server.address().port);
});
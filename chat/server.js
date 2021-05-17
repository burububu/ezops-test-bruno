const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

const db_url = 'postgres://user95fb04:yQknYTfpHMrq86vD@bruno.cpxgsuaa8wqm.us-west-1.rds.amazonaws.com:5432/bruno'
const sequelize = new Sequelize(db_url, {dialect: 'postgres'});

const Message = sequelize.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    style: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(__dirname));
app.get('/messages', (req, res) => {
    Message.findAll({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    console.log(req)
    message.save((err) => {
        if (err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

io.on('connection', () => {
    console.log('an user is connected')
})

const server = http.listen(80, () => {
    console.log("server is running on port", server.address().port);
});
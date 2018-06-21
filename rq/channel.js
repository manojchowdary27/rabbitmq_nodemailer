var amqp = require('amqplib');
var url = `amqp://manoj:manoj@127.0.0.1:5672`;
var connection = amqp.connect(url)
var channel = connection.then( function(c){
    return c.createChannel().then((channel)=>{
        return channel
    })
})
module.exports = channel

const Channel = require("./channel.js")
const transport = require("./../mailer.js")
const config = {sendMailsInDevelopment:true};

function Consumer(queue) {
    Channel.then((channel)=>{
        consume();
        function consume() {
            channel.get(queue, {}).then((msg)=>{
                if(msg){
                    let content = JSON.parse(msg.content)
                    if(queue=="mails"){
                        //console.log('sending Mail %j', content.task);
                        let allowToSendMails = process.env.NODE_ENV=='production' ? true : config.sendMailsInDevelopment
                        if(allowToSendMails){
                            transport.sendMail(content.task, function (err, info) {
                                if (err) {
                                    console.log('Message failed : %s',err.message);
                                    setTimeout(function () {
                                    channel.nack(msg);
                                        consume();
                                    }, 1000);
                                }
                                setTimeout(function() {
                                    channel.ack(msg);
                                    consume();
                                }, 1e3);
                            });
                        }
                        else{
                           console.log(content) 
                           setTimeout(function() {
                                channel.ack(msg);
                                consume();
                            }, 1e3);
                        }
                    }
                }else {
                    setTimeout(consume, 1e3);
                }
            })
        }
    });
}
module.exports = Consumer

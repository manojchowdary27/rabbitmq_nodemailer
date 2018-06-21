var Channel = require('./channel');

module.exports = produceQ
function produceQ(task,queueName,data={}) {
   return Channel.then((c)=>{
      return c.assertQueue(queueName,{durable: true}).then((ok)=>{
         return c.sendToQueue(queueName, encode({task:task,data:data}),{persistent:true})
      })
   })
   .catch((err)=>{console.log(err); return err})
    
   function encode(task) {
      return new Buffer(JSON.stringify(task));
   }
}

/*
***Docs***
Desc: "This is a common module to enqueue the tasks such as events and mails"
Usage Steps:
1.import this file. Ex: const produceQ = require("/path/produceQ.js")
2.produceQ("task","queueName","Data is optional useful for only events Q")
*/
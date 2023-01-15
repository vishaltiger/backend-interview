const express = require('express')
const app = express()
app.use(express.json());
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres',
      database : 'postgres'
    }
  });
 

// get all orders
  app.get('/allorders',(req,res)=>{
    db.select(['fee','service']).from('orders').then(data=>res.json({"data":data,"success":200}));
  })

 // save new service to data base 
  app.post('/addservice',(req,res)=>{
    const {serviceId,name} = req.body;
    db('services').insert({
        serviceid:serviceId,
        name:name.toLowerCase()
    }).then(console.log({'success':200})).catch(err=>res.json({'failed':400}));
    res.json({'success':200});
  })
  
  // get selected orders based on service
  app.post('/getorderbyservice',(req,res)=>{
    const {name} = req.body;
    
    db.select(['serviceid']).from('services').where('name',name).limit(1).then(data=>{
        if(data && data.length){
            console.log(data);
         let serviceId = data[0].serviceid;
         db.select(['fee','datetime']).from('orders').where('service',serviceId).then(data=>res.json({"data":data,"success":200}));
        }
    }).catch(err=>res.json({"error":404}));
  })

 // add new service 

app.post('/addorder',(req,res)=>{
    const {totalFee,services} = req.body;
    if(totalFee && services){
        services.length && services.forEach(service => {
            db('orders').insert({
                fee:totalFee,
                service:service,
                datetime:new Date()
            }).then(data=>console.log('inserted')).catch({"error":500});
        });
        res.json({"success":200});
    }
})


  app.listen(3000);
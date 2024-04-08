const express = require('express')
const app = express();

app.use(express.json())

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

app.get('/', function(req,res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i = 0; i < numberOfKidneys; i++){
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys,
    })
})

app.post('/', function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy,
    })
    res.json({
        msg: "done"
    })
})

app.put('/', function (req, res) {
    for(let i = 0; i < users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }  
    res.json({
        msg: "done"
    })
})

app.delete('/', function(req, res) {
    let isAtleastOneUnhealthyKidney = false;
    for(let i = users[0].kidneys.length - 1; i >= 0; i--){
        if (!users[0].kidneys.healthy) {
            isAtleastOneUnhealthyKidney = true;
        }
    }

    if (isAtleastOneUnhealthyKidney) {
        for(let i = users[0].kidneys.length - 1; i >= 0; i--){
            if (!users[0].kidneys.healthy) {
                users[0].kidneys.splice(i,1);
            }
        }
        res.json({
            msg: "done"
        })
    }else{
        res.status(411).json({
            msg: "NO unhealthy kidney"
        })
    }
    
})

app.listen(3000,()=>console.log("connected"))
const moment=require('moment');
let express=require('express');
let app=express();
// app.use(express.urlencoded({
//     extended:true
// }))

// app.post('/insertvalue',(req,res)=>{

// let username=req.body.name;
// let group=req.body.group;










// })
function messagetext(username,text){
    return{
        username,
        text,
         time:moment().format('h:mm a')
    }
};
module.exports=messagetext;


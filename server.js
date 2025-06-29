
const express = require('express');
const app = express();
const PORT = 6000;

app.route("/t",(req,res)=>{
    res.send('hello test')
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
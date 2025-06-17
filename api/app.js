import express from "express"

const app= express();
app.use("/api/auth",(req,res)=>{
    res.send("it will work")
})
app.use("/api/auth/register",(req,res)=>{
    res.send("it will work")
})
app.use("/api/auth/logout",(req,res)=>{
    res.send("it will work")
})
app.use("/api/posts",(req,res)=>{
    res.send("it will work")
})
app.use("/api/posts",(req,res)=>{
    res.send("it will work")
})

app.listen(8000,()=>{
    console.log("server is running")
});

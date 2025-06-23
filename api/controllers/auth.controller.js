import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
export const register = async(req,res)=>{
const{username,email,password} =req.body;
try{



// hash the password
// create a new user and save to do
const hashedPassword = await bcrypt.hash(password,10)
const newUser = await prisma.user.create({
    data:{
        username,
        email,
        password:hashedPassword,

    }
})
console.log(newUser);
res.status(201).json({message:"user created successfully"})
}catch(err){
    res.status(500).json({message:"failed to create user"})
}

}
export  const login =async (req,res)=>{
    const {username,password} = req.body;
    try {

        const user = await prisma.user.findUnique({
            where:{username}
        });
        if (!user) return res.status(401).json({message:"Invalid Credentials"});
        const isPasswordValid =await bcrypt.compare(password,user.password)
        // res.setHeader("Set-Cookie","test="+"myvalue").json("success")
        
        const age = 1000*60*60*24*7;
        const token = jwt.sign({
            id: user.id
        },process.env.JWT_SECRET_KEY,
    {expiresIn:age})
        // generate cookie parser token and send to the user
        res.cookie("token",token,{
          httpOnly:true,
        //   secure:true  
        maxAge:age
        }).status(200).json("login successfull")
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"failed to login"})
    }

    // / Check if user exists
    // check if the password is correct
    // generate cookie token and send to the user


}
export const logout =(req,res)=>{
    res.clearCookie("token").status(200).json({message:" logout success"})

}

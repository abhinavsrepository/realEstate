import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";

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
export const login =(req,res)=>{
    const {username,password} = req.body;
    try {

        const user = await prisma.user.findUnique({
            where:{username:username}
        })
        
    } catch (error) {
        console.log(first)
        res.status(500).json({message:"failed to login"})
    }

    // / Check if user exists
    // check if the password is correct
    // generate cookie token and send to the user


}
export const logout =(req,res)=>{

}

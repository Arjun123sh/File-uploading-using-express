const mongoose = require("mongoose");
const nodemailer=require("nodemailer")
require("dotenv").config()

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

fileSchema.post("save",async function(doc){
    try{
        console.log(doc)
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        })
        // send mail
        let info=await transporter.sendMail({
            from:"codehelp",
            to:doc.email,
            subject:"new file upload on claudinary",
            html:`<h1>Hello world</h1> 
            view here:-${doc.imageUrl}
            `
        })
        console.log(info)
    }
    catch(err){
        console.error(err);

    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;
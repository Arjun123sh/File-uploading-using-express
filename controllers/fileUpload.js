
const File = require("../models/File");
const cloudinary=require("cloudinary").v2

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFiletoClaudinary(file,folder){
    const options={folder}
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.ImageUplaod=async(req,res)=>{
    try{
        // data fecth
        const {name,tags,email}=req.body;

        const file=req.files.imageFile;
        // console.log(file);

        // validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            });
        }
        const response=await uploadFiletoClaudinary(file,"Arjun");
        console.log(response)
        // save entry to db
        const filedata=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageurl:response.secure_url,
            message:"Image Succesfully Uploaded",
        });
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message2:err.message
        })
    }
}

// video upload

exports.videoUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file=req.files.videoFile;
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        // add a upper limit of 5 mb in video
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            });
        }
        const response=await uploadFiletoClaudinary(file,"Arjun");
        const filedata=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageurl:response.secure_url,
            message:"Video Succesfully Uploaded",
        });
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message2:err.message
        })
    }
}
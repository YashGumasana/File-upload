import File from "../models/file.js";
import { StatusCodes } from "http-status-codes";
// import upload from "../File/fileUpl.js";
import cloudinary from 'cloudinary';
import fs from 'fs';

const getFile = async (req, res) => {
    const file = await File.find({});
    res.status(StatusCodes.OK).json({ file });
}

const createFile = async (req, res) => {
    const file = await File.create(req.body);
    res.status(StatusCodes.CREATED).json({ file });
}

const uploadFile = async (req, res, next) => {
    // console.log(req.files.image.tempFilePath);
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,

        {
            use_filename: true,
            folder: 'file-upload',
        }
    );
    fs.unlinkSync(req.files.image.tempFilePath);
    console.log(result);
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}


export { getFile, createFile, uploadFile };


// const result = await cloudinary.uploader
    // let file;

    // if (!req.files) {
    //     res.send("File was not found");
    //     return;
    // }

    // file = req.files.image;  // here is the field name of the form

    // res.send("File Uploaded");

    // res.send('uploadfile')
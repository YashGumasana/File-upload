import express from "express";
const router = express.Router();


import { getFile, createFile, uploadFile } from "../controller/fileUpload.js";

router.route('/').get(getFile).post(createFile);

router.route('/upload').post(uploadFile);




export default router;

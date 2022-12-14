import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

import express from 'express';
const app = express();


import fileUpload from 'express-fileupload';

import cloudinary1 from 'cloudinary';
const cloudinary = cloudinary1.v2;



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
//connectDB
import connectDB from './db/connect.js';

// import authenticateUser from './middleware/authentication.js';

//routers
import fileRouter from './routes/fileUpload.js';



//error handler
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.static('./public'));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));


//router rute
app.use('/api/v1/file', fileRouter);


app.use(notFound);
app.use(errorHandlerMiddleware);


const port = 80;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
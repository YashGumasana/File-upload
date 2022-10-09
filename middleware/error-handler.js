import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try agian later'
    }
    console.log('---');
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
        customError.statusCode = 400;
    }

    if (err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field,please choose another one`;
        customError.statusCode = 400;
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }


    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    console.log(err);
    return res.status(customError.statusCode).json({ msg: customError.msg });

}

export default errorHandlerMiddleware;
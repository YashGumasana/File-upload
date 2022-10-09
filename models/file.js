import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide Name'],
        maxlength: 50
    },
    price: {
        type: Number,
        required: true,

    },
    image: {
        type: String,
        required: true,
    },
});

export default mongoose.model('File', FileSchema);
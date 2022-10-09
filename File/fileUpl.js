import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + '.jpg');
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1048576 }, //10mb (not sure)
    fileFilter: function (req, file, cb) {

        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the " + "Following filetypes - " + filetypes);
    }
}).single("mypic");

export default upload;
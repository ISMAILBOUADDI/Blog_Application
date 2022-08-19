const multer = require("multer");

//storage
const multerStorage = multer.memoryStorage();

//file type checking
const multerFilter = (req, file, cb) =>{
    // check file type
    if (file.mimeType.startsWith("image")){
        cb(null, true)
    }else {
        //rejected files
        cb(
            {
                message: "Unsupported file format",
            },
            false
        )
    }
}

const profilePohotoUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

module.exports = {
    profilePohotoUpload
}
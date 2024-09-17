import multer from 'multer';

//set up storage for saving images
const storage = multer.diskStorage({
    //select folder(destination) for images
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    //set filename for images
    filename: (req, file, cb) => {
        const filename = `image-${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});


const multerConfig = multer({ storage });

export default multerConfig;

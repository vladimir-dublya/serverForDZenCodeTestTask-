import multer from 'multer';
import moment from 'moment';

const storage = multer.diskStorage({
    destination(req, file, cb)  {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/*' || file.mimetype === 'text/*') {
        cb(null,true);
    } else {
        cb(null, false);
    }
}

const limits = {
    fileSize: 320 * 240
}

const upload = multer({
    storage,
    fileFilter,
    limits,
  }); 
  
export const uploadPostImageDisk = upload.single('image');
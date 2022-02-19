const multer = require('multer');

// object of mime types to allow
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// check mime type, rename and store file
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "post_image") callback(null, './images/posts/');
        else if (file.fieldname === "profil_picture") callback(null, './images/profils/');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name[0] + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage: storage});
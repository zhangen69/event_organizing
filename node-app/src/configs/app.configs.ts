const mongoose = {
    connection: 'mongodb+srv://jacob:RRgqCzxv5stwDPvZ@node-app-yfxfw.gcp.mongodb.net/demo_db?retryWrites=true',
    // connection: 'mongodb://localhost:27017/demo_db',
};

const cloudinary = {
    cloud_name: 'dfupaaz9h',
    api_key: '597377239584466',
    api_secret: '6JeSp8D94uXUfMx9a-vH-KyiQ6I',
};

const mailAuth = {
    user: 'noreply.evtorgms@gmail.com',
    pass: 'evtorgms123',
};

const mail = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: mailAuth,
};

export default { cloudinary, mongoose, mail, mailAuth };

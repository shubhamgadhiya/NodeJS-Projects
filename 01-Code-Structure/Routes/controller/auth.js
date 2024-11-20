const User = require("../../model/user");
const bcrypt = require("bcrypt");
const cloudinary = require('../../cloudinary/Config');
const path = require('path');
const mailer = require('../../mailer/sendmail');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const data = req.body;
        const existingUser = await User.findOne({
            $or: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
        });

        if (existingUser) {
            const errorMessage =
                existingUser.email === data.email
                    ? 'Email already exists'
                    : 'Mobile number already exists';

            return res.status(400).json({
                data: null,
                message: errorMessage,
                success: false,
                error: true,
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(data.password, salt);
        data.password = hasedPassword;

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(path.normalize(req.file.path), {
                    folder: 'profile_pictures',
                    use_filename: true,
                });
                data.profilePicture = result.secure_url;
            } catch (error) {
                res.status(500).json({ data: error.message, message: "Cloudinary upload error. Please try again later.", success: false, error: true });
            }
        }

        const user = await User(data).save();
        res.status(200).json({ data: user, message: "User has been created successfully.", success: true, error: false });
    } catch (error) {
        res.status(500).json({ data: error.message, message: "Failed to create user. Please try again later.", success: false, error: true });
    }
};

const login = async (req, res) => {
    try {
        const data = req.body;

        const userDetails = await User.findOne({ email: data.email })
        if (!userDetails) {
            res.status(400).json({ message: "User not found", success: false, error: true });
        }
        const validPassword = await bcrypt.compare(data.password, userDetails.password);
        if (!validPassword) {
            res.status(400).json({ message: "Invalid password", success: false, error: true });
        }
        let jwttoken = '';
        const tokendata = await jwt.sign({ userDetails }, "shubham", (err, token) => {
            if (err) {
                return res.status(400).json({ data: err.message, message: "Token not generated", success: false, error: true });
            }
            jwttoken = token;
        });


                
        console.log('tokendata',jwttoken )
        const mail = await mailer.loginSendMail(data.email);
        res.status(200).json({ data: userDetails,token: "Bearer "+ jwttoken, message: "User has been Login successfully.", success: true, error: false });

    } catch (error) {
        console.error(error);
        res.status(500).json({ data: error.message, message: "Failed to login user. Please try again later.", success: false, error: true });
    }
}


module.exports = { register, login };
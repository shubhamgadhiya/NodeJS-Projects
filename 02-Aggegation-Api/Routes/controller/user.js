const User = require('../../model/user');
const bcrypt = require('bcrypt');
const mailer = require('../../mailer/sendmail');

const user = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({data: user,message:"User has been find successfully.", success: true, error: false});
  } catch (error) {
    res.status(500).json({data: error.message,message:"Failed to find user. Please try again later.", success: false, error: true});
  }
};

const createUser = async (req, res) => {
  try {
    const data = req.body;
        
    console.log('createddata',data )
    const existingUser = await User.findOne({
      $or: [{email: data.email}, {mobile: data.mobile}],
    });

    if (existingUser) {
      const errorMessage =
        existingUser.email === data.email
          ? 'Email already exists'
          : 'Mobile number already exists';

      throw new Error(errorMessage);
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(data.password, salt);

    data.password = hasedPassword;
    if (req.file) {
        data.image = req.file.filename;
      }
    const user = await User(data).save();
    res.status(200).json({data: user, message:"User has been created successfully.", success: true, error: false});
  } catch (error) {
    res.status(500).json({data: error.message, message:"Failed to create user. Please try again later.", success: false, error: true});
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
  
 const existingUser = await User.findOne({
      $or: [{email: data.email}, {mobile: data.mobile}],
    });

    if (existingUser) {
      const errorMessage =
        existingUser.email === data.email
          ? 'Email already exists'
          : 'Mobile number already exists';

      throw new Error(errorMessage);
    }

    const user = await User.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({data: user,message:"User has been Updated successfully.", success: true, error: false});
  } catch (error) {
    res.status(500).json({data: error.message, message:"Failed to update user. Please try again later.", success: false, error: true});
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({data: user,message:"User has been Deleted successfully.", success: true, error: false});
  } catch (error) {
    res.status(500).json({data: error.message,message:"Failed to deleted user. Please try again later.", success: false, error: true});
  }
};

const login = async (req, res) => {
    
  try{
  
    const data = req.body;

    console.log('data', data)
    const user = await User.findOne({
      $or: [{email: data.email}, {mobile:data.mobile}]
    })
    if(!user){
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if(!validPassword){
      throw new Error("Invalid password");
    }
    const mail = await mailer.loginSendMail(data.email);
        
    console.log('mail',mail )
    res.status(200).json({data: user,message:"User has been Login successfully.", success: true, error: false});

  } catch(error){
    console.error(error);
    res.status(500).json({data: error.message, message:"Failed to login user. Please try again later.", success: false, error: true});
  }
}

module.exports = {user, createUser, updateUser, deleteUser, login};

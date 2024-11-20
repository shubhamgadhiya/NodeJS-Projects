const User = require('../../model/user');
const getDataByPaginate = require("../../common/common")
const user = async (req, res) => {
  try {
    const {aggregate_options, options} = getDataByPaginate(req, '');
    if (req.query.q) {
      aggregate_options.push({
        $match: {
          $or: [
            {email: {$regex: req.query.q, $options: 'i'}},
            {firstName: {$regex: req.query.q, $options: 'i'}},
            {lastName: {$regex: req.query.q, $options: 'i'}},
          ],
        },
      });
    }

    const userList = await User.aggregate(aggregate_options);
    const user = await User.aggregatePaginate(userList, options);

    res.status(200).json({data: user,message:"User has been find successfully.", success: true, error: false});
  } catch (error) {
    res.status(500).json({data: error.message,message:"Failed to find user. Please try again later.", success: false, error: true});
  }
};


module.exports = {user};

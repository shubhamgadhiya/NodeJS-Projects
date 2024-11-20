const Room = require('../../model/room');

const room = async (req, res) => {
  try {
    const aggegation = [
      {
        $lookup: {
          from: 'bookingrooms',
          localField: '_id',
          foreignField: 'roomId',
          as: 'BookingRooms',
        },
      },
      {
        $unwind: {
          path: '$BookingRooms',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const room = await Room.aggregate(aggegation);

    res
      .status(200)
      .json({
        data: room,
        message: 'Room has been find successfully.',
        success: true,
        error: false,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        data: error.message,
        message: 'Failed to get room. Please try again later.',
        success: false,
        error: true,
      });
  }
};

const createRoom = async (req, res) => {
  try {
    const data = req.body;
    const room = await Room.findOne({roomNumber: data.roomNumber});
    if (room) {
      throw new Error('Room already exists');
    }
    if (req.file) {
      data.roomImage = req.file.filename;
    }
    const roomSave = await Room(data).save();
    res
      .status(200)
      .json({
        data: roomSave,
        message: 'Room has been created successfully.',
        success: true,
        error: false,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        data: error.message,
        message: 'Failed to create room. Please try again later.',
        success: false,
        error: true,
      });
  }
};

const updateRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const room = await Room.findOne({roomNumber: data.roomNumber});
    if (room) {
      throw new Error('Room already exists');
    }
    const roomUpdate = await Room.findByIdAndUpdate(id, data, {new: true});
  } catch (error) {
    res
      .status(500)
      .json({
        data: error.message,
        message: 'Failed to update room. Please try again later.',
        success: false,
        error: true,
      });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        data: room,
        message: 'Room has been deleted successfully.',
        success: true,
        error: false,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        data: error.message,
        message: 'Failed to delete room. Please try again later.',
        success: false,
        error: true,
      });
  }
};

module.exports = {room, createRoom, updateRoom, deleteRoom};

const Booking = require('../../model/BookingRoom');
const mongoose = require('mongoose');

const booking = async (req, res) => {
  try {
    const booking = await Booking.find().populate('roomId').populate('userId');
    res.status(200).json({
      data: booking,
      message: 'Booking has been find successfully.',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
      message: 'Failed to get booking. Please try again later.',
      success: false,
      error: true,
    });
  }
};

const CreateBooking = async (req, res) => {
  try {
    const data = req.body;

    console.log('data', data);
    const fromDate = new Date(data.fromDate);
    const toDate = new Date(data.toDate);
    const roomId = data.roomId;
    const aggegation = [
      {
        $match: {
          roomId: new mongoose.Types.ObjectId(data.roomId),
          fromDate: {$lte: toDate},
          toDate: {$gte: fromDate},
        },
      },
    ];
    const existingBooking = await Booking.aggregate(aggegation);

    console.log('existingBooking', existingBooking);
    if (existingBooking.length > 0) {
      throw new Error('Room is already booked for this date.');
    }
    const bookingSave = await Booking(data).save();
    res.status(200).json({
      data: bookingSave,
      message: 'Booking has been created successfully.',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
      message: 'Failed to create booking. Please try again later.',
      success: false,
      error: true,
    });
  }
};

module.exports = {booking, CreateBooking};

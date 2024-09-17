import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../../Modules/Booking/Models/bookingSchema.mjs'; // Adjust the path as necessary

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create a payment order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in the smallest currency unit (e.g., cents for INR)
    
    // Create an order with Razorpay
    const order = await razorpay.orders.create({
      amount, // Amount in paise (e.g., 50000 paise = 500 INR)
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    });

    return res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
};

const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;


  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');


  if (generatedSignature == signature) {
      // Payment is verified
      res.json({ success: true });
  } else {
      // Payment verification failed
      res.json({ success: false });
  }
};

// const verifyPaymentSignature = (orderId, paymentId, signature) => {
//   const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

//   if (!razorpaySecret) {
//       throw new Error('RAZORPAY_SECRET is not defined');
//   }

//   const generatedSignature = crypto.createHmac('sha256', razorpaySecret)
//       .update(`${orderId}|${paymentId}`)
//       .digest('hex');

//   return generatedSignature === signature;
// };

// const verifyPayment = async (req, res) => {
//   const { orderId, paymentId, signature } = req.body;

//   if (verifyPaymentSignature(orderId, paymentId, signature)) {
//       // Signature is valid, proceed with booking
//       return res.json({ success: true });
//   } else {
//       return res.status(400).json({ message: 'Invalid signature' });
//   }
// };

// Endpoint to handle payment verification
// const verifyPayment = async (req, res) => {
//   try {
//     const { orderId, paymentId, signature } = req.body;

//     // Verify payment signature
//     const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(`${orderId}|${paymentId}`)
//       .digest('hex');

//     if (generatedSignature !== signature) {
//       return res.status(400).json({ message: 'Invalid signature' });
//     }

//     // Payment successful, update the booking status or any other necessary actions
//     // Assuming you have a way to get the booking using orderId
//     // const booking = await Booking.findOne({ orderId });
//     // console.log(booking);
    
//     // if (!booking) {
//     //   return res.status(404).json({ message: 'Booking not found' });
//     // }

//     // booking.paymentStatus = 'Paid';
//     // await booking.save();

//     return res.json({ message: 'Payment verified successfully' });
//   } catch (error) {
//     console.error('Error verifying payment:', error);
//     return res.status(500).json({ message: 'Error verifying payment' });
//   }
// };

const paymentController = {
  createOrder,
  verifyPayment
}

export default paymentController;
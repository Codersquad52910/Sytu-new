import Razorpay from 'razorpay';

const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkeyid123';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'mockkeysecret123';

export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export default razorpay;

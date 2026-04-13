import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ success: false, message: 'Email not found. Please create an account to login.' }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return Response.json({ success: false, message: 'Incorrect password. Please try again.' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });

    return Response.json({ 
      success: true, 
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        username: user.username,
        cart: user.cart || [],
        wishlist: user.wishlist || []
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

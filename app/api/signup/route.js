import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email, password, username } = body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return Response.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });

    return Response.json({ 
      success: true, 
      message: 'Signup successful',
      token,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

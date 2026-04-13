import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await dbConnect();

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (e) {
      return Response.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { cart, wishlist } = await request.json();

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: { cart, wishlist } },
      { new: true }
    );

    if (!user) {
      return Response.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Sync successful' });
  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

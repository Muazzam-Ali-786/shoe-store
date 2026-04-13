import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  await dbConnect();
  
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ success: false, message: 'No token' }, { status: 401 });
    }
    
    const token = authHeader.slice(7);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return Response.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }
    
    return Response.json({ 
      success: true, 
      token,
      user: { 
        id: user._id, 
        username: user.username,
        email: user.email,
        cart: user.cart || [],
        wishlist: user.wishlist || []
      } 
    });
  } catch (error) {
    return Response.json({ success: false, message: 'Token expired' }, { status: 401 });
  }
}

import dbConnect from '../../../lib/db';
import Product from '../../../models/Product';

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    
    let query = {};
    if (category) query.category = category;
    if (gender) query.gender = gender.toUpperCase();

    const products = await Product.find(query).sort({ createdAt: -1 });
    
    return Response.json({ success: true, products });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch products' }, { status: 500 });
  }
}

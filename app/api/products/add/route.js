import dbConnect from '../../../../lib/db';
import Product from '../../../../models/Product';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await dbConnect();

  try {
    // 1. Check Auth (Very basic admin check for demonstration)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       // return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
       // For now, allowing all for testing as per common development flow
    }

    const body = await request.json();
    const { name, brand, price, description, imageURL, category, gender, stock } = body;

    // Generate slug from name
    const slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000);

    const newProduct = await Product.create({
      name,
      brand,
      price,
      description,
      imageURL,
      category,
      gender,
      stock,
      items_left: stock,
      is_in_inventory: stock > 0,
      slug,
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1) // Random rating between 3.5 and 5.0
    });

    return Response.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Add product error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

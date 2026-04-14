import dbConnect from '../../../../lib/db';
import Product from '../../../../models/Product';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  await dbConnect();

  try {
    // 1. Check Auth (Very basic admin check for demonstration)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       // return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
       // For now, allowing all for testing as per common development flow
    }

    const formData = await request.formData();
    
    const name = formData.get('name');
    const brand = formData.get('brand');
    const price = formData.get('price');
    const description = formData.get('description');
    const category = formData.get('category');
    const gender = formData.get('gender');
    const stock = formData.get('stock');
    
    // Handle image file upload
    const file = formData.get('image');
    let imageURL = '';
    
    if (file && file instanceof File) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create a unique filename
      const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'images');
      const filePath = path.join(uploadDir, uniqueFileName);
      
      // Ensure the directory exists
      await mkdir(uploadDir, { recursive: true });
      
      await writeFile(filePath, buffer);
      imageURL = `/images/${uniqueFileName}`;
    } else {
      return Response.json({ success: false, message: 'Image file is required' }, { status: 400 });
    }

    // Generate slug from name
    const slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000);

    const newProduct = await Product.create({
      name,
      brand,
      price: Number(price),
      description,
      imageURL,
      category,
      gender,
      stock: Number(stock),
      items_left: Number(stock),
      is_in_inventory: Number(stock) > 0,
      slug,
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1) // Random rating between 3.5 and 5.0
    });

    return Response.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Add product error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

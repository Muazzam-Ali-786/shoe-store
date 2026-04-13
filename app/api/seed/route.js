import dbConnect from '../../../lib/db';
import Product from '../../../models/Product';
import shoesData from '../../../lib/shoesData';

export async function GET() {
  await dbConnect();

  try {
    // Clear existing products to avoid duplicates during seeding (optional)
    // await Product.deleteMany({});

    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 0) {
      return Response.json({ success: true, message: 'Database already seeded', count });
    }

    await Product.insertMany(shoesData);
    
    return Response.json({ 
      success: true, 
      message: 'Database seeded successfully',
      count: shoesData.length 
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json({ success: false, message: 'Seeding failed', error: error.message }, { status: 500 });
  }
}

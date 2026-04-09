import { NextResponse } from 'next/server';

const PEXELS_API_KEY = 'your_pexels_api_key_here'; // Get free key from https://www.pexels.com/api/

// Real shoe search keywords for each product ID
const shoeKeywords = [
  'adidas stan smith sneakers',
  'nike air max men running shoes',
  'nike air max women sneakers',
  'puma suede classic sneakers',
  'new balance 574 sneakers',
  'converse chuck taylor high top',
  'vans old skool skate shoes',
  'reebok classic leather sneakers',
  'adidas ultraboost running',
  'air jordan 1 low basketball',
  'nike blazer mid retro',
  'puma rs-x chunky sneakers',
  'new balance kids sneakers',
  'nike air force 1 kids',
  'adidas samba kids soccer',
  'converse chuck taylor kids',
  'vans slip on kids',
  'puma future kids speed',
  'under armour hovr running men',
  'asics gel kayano stability running'
];

async function fetchPexelsImage(keyword) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    const data = await response.json();
    return data.photos[0]?.src?.medium || 'https://via.placeholder.com/400x400?text=No+Image';
  } catch (error) {
    console.error('Pexels API error:', error);
    return 'https://via.placeholder.com/400x400?text=API+Error';
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || isNaN(id) || id < 1 || id > 20) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const keyword = shoeKeywords[id - 1];
  const imageUrl = await fetchPexelsImage(keyword);

  return NextResponse.json({ imageURL: imageUrl });
}


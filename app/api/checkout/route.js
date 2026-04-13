import Stripe from "stripe";

// Initialize inside the handler or with a check to avoid build-time errors
const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is missing in environment variables");
  }
  return new Stripe(key);
};

export async function POST(req) {
  try {
    const body = await req.json();
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const origin = req.headers.get('origin') || `${protocol}://${host}`;

    if (!body.items || body.items.length === 0) {
      return Response.json({ error: "No items provided in cart" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description,
            images: item.imageURL 
              ? [item.imageURL.startsWith('http') ? item.imageURL : `${origin}${item.imageURL.startsWith('/') ? '' : '/'}${item.imageURL}`] 
              : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return Response.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
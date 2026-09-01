export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }
  return new Response(JSON.stringify({ message: 'Chat endpoint initialized.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

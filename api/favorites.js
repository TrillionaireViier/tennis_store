export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = req.headers.authorization || '';
  if (!token.includes('mock_jwt')) {
    return res.status(401).json({ status: 'error', message: 'Будь ласка, авторизуйтесь для доступу до Бажаного.' });
  }

  const action = (req.body && req.body.action) || req.query.action;
  
  if (action === 'list') {
    return res.status(200).json({
      status: 'success',
      message: 'Список бажаного завантажено',
      favorites: [
        { id: 4, title: 'Турніри', icon: 'Trophy' }
      ]
    });
  }

  return res.status(400).json({ status: 'error', message: 'Невідома дія.' });
}

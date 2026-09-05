export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const data = req.body || req.query || {};
  const action = data.action || req.query.action;

  if (action === 'login') {
    const email = data.email || '';
    const password = data.password || '';

    if (email === 'admin@test.com' && password === '123456') {
      return res.status(200).json({
        status: 'success',
        message: 'Успішна авторизація!',
        token: 'mock_jwt_token_8829910',
        user: { id: 1, name: 'Адміністратор', email }
      });
    } else {
      return res.status(200).json({
        status: 'error',
        message: 'Невірний email або пароль! (Спробуйте admin@test.com / 123456)'
      });
    }
  }

  return res.status(400).json({
    status: 'error',
    message: 'Невідома дія (action). Доступні: login.'
  });
}

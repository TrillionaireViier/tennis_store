export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const categories = [
    { id: 2, title: 'Групові Тренування', description: 'Навчання в групах під керівництвом майстрів спорту.', icon: 'Users' },
    { id: 3, title: 'Індивідуальні Заняття', description: 'Персональний підхід для швидкого прогресу.', icon: 'Dumbbell' },
    { id: 4, title: 'Турніри', description: 'Щотижневі змагання для любителів та професіоналів.', icon: 'Trophy' },
    { id: 5, title: 'Корпоративи', description: 'Організація спортивних заходів для компаній.', icon: 'Activity' },
    { id: 6, title: 'Ремонт Інвентарю', description: 'Переклейка накладок та збірка ракеток.', icon: 'ShieldCheck' }
  ];

  return res.status(200).json({
    status: 'success',
    data: categories,
    seo: {
      title: 'Послуги Настільного Тенісу | Table Tennis Store',
      description: 'Найкращі зали, тренування та турніри з настільного тенісу в Києві.'
    }
  });
}

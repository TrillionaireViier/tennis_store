export default function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Mock database
  const categories = [
    {
      id: 1,
      title: "Оренда Столів",
      description: "Професійні столи для вашої гри в зручний час.",
      icon: "Target"
    },
    {
      id: 2,
      title: "Групові Тренування",
      description: "Навчання в групах під керівництвом майстрів спорту.",
      icon: "Users"
    },
    {
      id: 3,
      title: "Індивідуальні Заняття",
      description: "Персональний підхід для швидкого прогресу.",
      icon: "Dumbbell"
    },
    {
      id: 4,
      title: "Турніри",
      description: "Щотижневі змагання для любителів та професіоналів.",
      icon: "Trophy"
    },
    {
      id: 5,
      title: "Корпоративи",
      description: "Організація спортивних заходів для компаній.",
      icon: "Activity"
    },
    {
      id: 6,
      title: "Ремонт Інвентарю",
      description: "Переклейка накладок та збірка ракеток.",
      icon: "ShieldCheck"
    }
  ];

  // Return JSON response
  res.status(200).json({
    status: "success",
    data: categories,
    seo: {
      title: "Послуги Настільного Тенісу | Table Tennis Store",
      description: "Найкращі зали, оренда столів, тренування та турніри з настільного тенісу в Києві."
    }
  });
}

import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. 真实数据接口：获取比特币实时价格 (使用 CoinGecko 免费 API)
  app.get("/api/market/btc", async (req, res) => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
      const price = response.data.bitcoin.usd;
      res.json({ 
        id: 'btc-price',
        question: "Will Bitcoin stay above $" + (Math.floor(price / 1000) * 1000) + " today?",
        currentPrice: price,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch real market data" });
    }
  });

  // 2. 模拟数据库：处理积分和推荐 (后续可接入 Supabase 免费数据库)
  let userStats = {
    points: 1250,
    referrals: 5
  };

  app.get("/api/user/stats", (req, res) => {
    res.json(userStats);
  });

  app.post("/api/user/bet", (req, res) => {
    const { amount } = req.body;
    userStats.points += Math.floor(amount * 10);
    res.json({ success: true, newPoints: userStats.points });
  });

  // 3. 集成 Vite 中间件 (开发模式)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

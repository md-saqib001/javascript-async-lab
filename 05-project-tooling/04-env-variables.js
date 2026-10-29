console.log("=== Booting up Server ===");

// 1. Try to read the variables from process.env
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

if (!port || !apiKey) {
  console.log("❌ ERROR: Missing environment variables! Did you forget the .env file?");
} else {
  console.log("✅ Configuration Loaded Successfully!");
  console.log(`📡 Server listening on port: ${port}`);
  console.log(`🔑 Using API Key: ${apiKey.substring(0, 7)}... (hidden for security)`);
  console.log(`🗄️  Database string: ${process.env.DATABASE_URL}`);
}
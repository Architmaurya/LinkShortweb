import crypto from "crypto";
import Url from "../models/Url.js";

// Helper: generate crypto domain
function generateCryptoDomain() {
  const random = crypto.randomBytes(4).toString("hex");  // e.g. a92kd9f3
  const tlds = ["com", "net", "org", "io", "app"];
  const tld = tlds[Math.floor(Math.random() * tlds.length)];
  return `https://${random}.${tld}`;
}

// CREATE SHORT URL
export const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl)
      return res.json({ success: false, message: "URL is required" });

    // 1️⃣ Crypto-generated domain instead of BASE_URL from .env
    const cryptoBaseUrl = generateCryptoDomain(); 

    // 2️⃣ Crypto-generated path
    const shortId = crypto.randomBytes(4).toString("hex");

    // 3️⃣ Save data
    const newUrl = await Url.create({
      shortId,
      longUrl,
      cryptoDomain: cryptoBaseUrl
    });

    // 4️⃣ Return two URLs:
    // - crypto front URL (for users)
    // - backend working URL (redirect)
    return res.json({
      success: true,
      shortUrl: `${cryptoBaseUrl}/${shortId}`,                 // CRYPTO FORM
      backendShortUrl: `${process.env.BASE_URL}/${shortId}`,   // REAL REDIRECT
      data: newUrl
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// REDIRECT URL
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const data = await Url.findOne({ shortId });
    if (!data) return res.status(404).send("Short URL not found");

    data.clicks += 1;
    await data.save();

    return res.redirect(data.longUrl);

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

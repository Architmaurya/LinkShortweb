import crypto from "crypto";
import Url from "../models/Url.js";

// CREATE SHORT URL
export const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.json({
        success: false,
        message: "URL is required",
      });
    }

    // Check if BASE_URL exists
    if (!process.env.BASE_URL) {
      console.error("❌ ERROR: BASE_URL missing in .env");
      return res.status(500).json({
        success: false,
        message: "Server configuration error: BASE_URL missing",
      });
    }

    // Remove trailing slash from BASE_URL (important)
    const cleanBaseUrl = process.env.BASE_URL.replace(/\/$/, "");

    // Generate short ID
    const shortId = crypto.randomBytes(4).toString("hex");

    // Save into DB
    const newUrl = await Url.create({
      shortId,
      longUrl,
    });

    // Final short URL
    const shortUrl = `${cleanBaseUrl}/${shortId}`;

    return res.json({
      success: true,
      shortUrl,
      data: newUrl,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// REDIRECT HANDLER
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const data = await Url.findOne({ shortId });

    if (!data) {
      return res.status(404).send("Short URL not found");
    }

    data.clicks += 1;
    await data.save();

    return res.redirect(data.longUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

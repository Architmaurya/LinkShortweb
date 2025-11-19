import crypto from "crypto";
import Url from "../models/Url.js";

// CREATE SHORT URL
export const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.json({ success: false, message: "URL is required" });
    }

    // Generate short ID
    const shortId = crypto.randomBytes(4).toString("hex");

    // Save into DB
    const newUrl = await Url.create({
      shortId,
      longUrl
    });

    // Use ONLY your frontend domain from .env
    const shortUrl = `${process.env.BASE_URL}/${shortId}`;

    return res.json({
      success: true,
      shortUrl,
      data: newUrl
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// REDIRECT URL HANDLER
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const data = await Url.findOne({ shortId });

    if (!data) {
      return res.status(404).send("Short URL not found");
    }

    data.clicks += 1;
    await data.save();

    // Redirect to real long URL
    return res.redirect(data.longUrl);

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
};

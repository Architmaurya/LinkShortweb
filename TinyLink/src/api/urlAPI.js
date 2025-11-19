// src/api/urlAPI.js

import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";

export const createShortURL = async (longUrl) => {
  const response = await apiConnector(
    "POST",
    endpoints.SHORTEN_URL,
    { longUrl }
  );

  return response.data;
};

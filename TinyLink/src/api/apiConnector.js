// src/api/apiConnector.js

import axios from "axios";

export const apiConnector = async (method, url, bodyData = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data: bodyData,
      headers,
    });

    return response;
  } catch (error) {
    console.error("API Connector Error:", error);
    throw error;
  }
};

//apiLogin.jsx
// Utils/EventsUtils.js
export const sendLogin = async (url, method, body = null) => {
  try {
    // If the body is not FormData, assume it's JSON.
    const isFormData = body instanceof FormData;
    const token = localStorage.getItem("token");
    const headers = isFormData
      ? {
          ...(token && { Authorization: `Token ${token}` }),
        }
      : {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Token ${token}` }),
        };

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

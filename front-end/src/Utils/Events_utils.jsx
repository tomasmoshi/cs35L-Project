/**
 * A reusable async function to send requests to the backend.
 *
 * @param {string} url - The backend API endpoint.
 * @param {string} method - The HTTP method (e.g., "POST", "GET").
 * @param {FormData|null} formData - The form data to send (or null for GET requests).
 * @returns {Promise<object|null>} - The response data or null if there's an error.
 */
export const sendRequest = async (url, method, formData = null) => {
    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
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
  
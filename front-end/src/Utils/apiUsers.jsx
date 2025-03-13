const apiUsers = async (url, method, data = null, isFormData = false) => {
  try {
      const token = localStorage.getItem("token");

      let headers = {
          ...(token && { "Authorization": `Token ${token}` }),
      };

      if (!isFormData) {
          headers["Content-Type"] = "application/json";
      }

      let options = {
          method,
          headers,
          body: isFormData ? data : JSON.stringify(data),
      };

      if (method === "GET" || method === "HEAD") {
          delete options.body;
      }

      const response = await fetch(url, options);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
};
export default apiUsers;
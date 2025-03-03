
const apiUsers = async (url, method, formData = null) => {
    try {
      const token = localStorage.getItem("token");
      
      // Ensure headers include authentication & content type
      const headers = {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Token ${token}` }),
      };
  
      const response = await fetch(url, {
        method,
        headers,
        body: formData,
      });
  
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
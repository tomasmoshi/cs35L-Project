import React, { useEffect, useState } from 'react';

function Account() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json(); // Ensure data is defined here
      setUser(data);
    }

    if (token) {
      fetchData();
    }
  }, [token]);

}

export default Account;

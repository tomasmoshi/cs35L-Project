import React, { createContext, useState, useEffect } from "react";
import apiUsers from "../../Utils/apiUsers";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const data = await apiUsers("http://127.0.0.1:8000/api/users/me/", "GET");
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser: fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

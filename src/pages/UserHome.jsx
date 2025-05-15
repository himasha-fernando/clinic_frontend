import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { Link } from "react-router-dom";

const UserHome = () => {
  const [storeId, setStoreID] = useState("");
  const [storeName, setStoreName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNic, setUserNic] = useState("");

  useEffect(() => {
    setStoreID(localStorage.getItem("userID") || "");
    setStoreName(localStorage.getItem("userName") || "");
    setUserEmail(localStorage.getItem("userEmail") || "");
    setUserNic(localStorage.getItem("userNic") || "");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <UserHeader />

      <div className="flex justify-center mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <div className="flex items-center space-x-6 mb-6">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Unknown User"
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">
                {storeName || "Unknown User"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">User Profile</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Email:
              </span>
              <span>{userEmail || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                NIC:
              </span>
              <span>{userNic || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                User ID:
              </span>
              <span className="break-all">{storeId || "N/A"}</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/edit-profile">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

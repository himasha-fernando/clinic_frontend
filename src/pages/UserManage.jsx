import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserManage() {
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [password, setPassword] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/register")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      nic,
      password,
    };

    if (editingUserId) {
      axios
        .put(`http://localhost:8080/api/users/${editingUserId}`, userData)
        .then((response) => {
          const updatedUsers = users.map((user) =>
            user._id === editingUserId ? response.data : user
          );
          setUsers(updatedUsers);
          setEditingUserId(null);
          showSuccessPopup();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      axios
        .post("http://localhost:8080/api/users", userData)
        .then((response) => {
          setUsers([...users, response.data]);
          setUserName("");
          setEmail("");
          setNIC("");
          setPassword("");
          showSuccessPopup();
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  const showSuccessPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // hide after 3s
  };

  const handleEdit = (user) => {
    setUserName(user.username);
    setEmail(user.email);
    setNIC(user.nic);
    setPassword(user.password);
    setEditingUserId(user._id);
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:8080/api/users/${userId}`)
      .then(() => {
        const remainingUsers = users.filter((user) => user._id !== userId);
        setUsers(remainingUsers);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center justify-between w-auto min-w-[300px] max-w-md">
          <svg
            className="w-5 h-5 ml-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          ''
          <span>You have been successfully added as a user.</span>
        </div>
      )}

      {/* Form Section */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/14.jpg')" }}
      >
        <div className="relative bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="absolute top-2 right-2">
            <Link to="/">
              <button
                className="bg-red-400 hover:bg-red-600 px-3 py-1 rounded-full text-white font-bold transition-colors duration-200"
                aria-label="Close"
              >
                X
              </button>
            </Link>
          </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <h1 className="text-xl font-bold text-center text-gray-900 md:text-2xl dark:text-white">
                {editingUserId ? "Update User" : "Create an account"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  National Identity Card Number (NIC)
                </label>
                <input
                  type="text"
                  placeholder="Enter your NIC Number"
                  value={nic}
                  onChange={(e) => setNIC(e.target.value)}
                  className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="flex justify-between space-x-4">
                <Link to="/login" className="w-1/2">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-[#0f172a] transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back
                  </button>
                </Link>

                <button
                  type="submit"
                  className="w-1/2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-[#0f172a] transition duration-200"
                >
                  {editingUserId ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <br />
      <h1 className="text-3xl font-bold underline">User List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">NIC</th>
              <th className="px-6 py-3">Password</th>
              <th className="px-6 py-3">Edit</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.nic}</td>
                <td className="px-6 py-4">{user.password}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="hover:bg-sky-700 px-2 py-2 hover:text-white"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="hover:bg-sky-700 px-2 py-2 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserManage;

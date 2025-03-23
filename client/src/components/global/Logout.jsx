import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage or sessionStorage
    localStorage.removeItem("token"); // If using localStorage
    sessionStorage.removeItem("token"); // If using sessionStorage

    // Optional: Clear cookies if stored in HTTP-only cookies
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include", // Include cookies if used
    });

    // Redirect to login after logout
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default Logout;

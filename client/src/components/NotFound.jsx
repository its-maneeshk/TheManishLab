import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
      <Link to="/login" className="text-blue-500 hover:underline">
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;

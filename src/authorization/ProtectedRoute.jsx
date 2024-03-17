import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    // Check if the access token exists in localStorage
    return !!localStorage.getItem('accessTokenUser');
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;

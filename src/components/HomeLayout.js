import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/app/planets" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
};

export default HomeLayout
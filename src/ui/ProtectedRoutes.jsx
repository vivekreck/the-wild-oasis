import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 3. If there is No authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  // 2. While loading, show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there Is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoutes;

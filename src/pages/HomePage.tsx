import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";

const HomePage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <Box>
      {isAuthenticated ? null : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </Box>
  );
};

export default HomePage;

import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NavbarB = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Academia
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/user")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/user/my_orders")}>
            My Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/user/make_order")}>
            Let's Eat!
          </Button>
          <Button color="inherit" onClick={() => navigate("/user/profile")}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarB;

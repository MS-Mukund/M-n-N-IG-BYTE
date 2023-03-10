import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
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
          <Button color="inherit" onClick={() => navigate("/badmin")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/badmin/view_orders")}>
            View Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/badmin/Items")}>
            My Items
          </Button>
          <Button color="inherit" onClick={() => navigate("/badmin/profile")}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

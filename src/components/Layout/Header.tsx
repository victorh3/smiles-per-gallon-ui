import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DatasetIcon from "@mui/icons-material/Dataset";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="entry"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/entry"
          >
            <EditNoteIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/spg"
          >
            <DatasetIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button component={RouterLink} to="/" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

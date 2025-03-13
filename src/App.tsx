import Carlist from "./components/carlist"
import Container from '@mui/material/Container';
import CssBaseLine from '@mui/material/CssBaseLine';
import AppBar from '@mui/material/AppBar';
import  Toolbar  from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
      <CssBaseLine />
    </Container>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Home, LogEntry, Historical } from "./pages";
import { Layout } from "./components/Layout";

function App() {
  return (
    <>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/entry" element={<LogEntry />} />
              <Route path="/spg" element={<Historical />} />
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </>
  );
}

export default App;

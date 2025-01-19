import React from "react";
import { Container, Box } from "@mui/material";

import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="md">
          <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
            {children}
          </Box>
        </Container>
      </main>
    </>
  );
}

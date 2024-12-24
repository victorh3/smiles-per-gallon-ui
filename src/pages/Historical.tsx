import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Entry {
  id: number;
  date: string;
  mileage: number;
  gallons: number;
}

const SmilesPerGallon: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("https://api.example.com/entries");
        if (!response.ok) {
          throw new Error("Failed to fetch entries");
        }
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        setError(`Failed to fetch entries. ${JSON.stringify(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historical Entries
      </Typography>
      <List>
        {entries.map((entry) => (
          <ListItem key={entry.id}>
            <ListItemText
              primary={`Date: ${entry.date}`}
              secondary={`Mileage: ${entry.mileage}, Gallons: ${entry.gallons}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SmilesPerGallon;

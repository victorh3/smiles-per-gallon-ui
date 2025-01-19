import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Entry {
  _id: number;
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
        const response = await fetch(
          "https://smiles-per-gallon-api.vercel.app/all-entries"
        );
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Gallons Filled</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Mileage Difference</TableCell>
              <TableCell>MPG</TableCell>
              <TableCell>Difference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => {
              return (
                <TableRow key={entry._id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.gallons}</TableCell>
                  <TableCell>{entry.mileage}</TableCell>
                  <TableCell>
                    {index > 0
                      ? entries[index].mileage - entries[index - 1].mileage
                      : ""}
                  </TableCell>
                  <TableCell>
                    {index > 0
                      ? (
                          (entries[index].mileage -
                            entries[index - 1].mileage) /
                          entries[index].gallons
                        ).toFixed(2)
                      : ""}
                  </TableCell>
                  <TableCell>
                    {index > 1
                      ? (entries[index].mileage - entries[index - 1].mileage) /
                          entries[index].gallons -
                        (entries[index - 1].mileage -
                          entries[index - 2].mileage) /
                          entries[index - 1].gallons
                      : ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SmilesPerGallon;

import React, { useState } from "react";
import { Alert, Box, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface LogEntryState {
  date: Dayjs | null;
  mileage: string;
  gallons: string;
  password: string;
}

const defaultState: LogEntryState = {
  date: dayjs(),
  mileage: "",
  gallons: "",
  password: "",
};

const LogEntry: React.FC = () => {
  const [logEntry, setLogEntry] = useState<LogEntryState>(defaultState);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setLogEntry((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const resetState = () => {
    setLogEntry(defaultState);
    setAlertMessage(null);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setLogEntry((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleAddEntry = async () => {
    // Handle log entry logic here
    if (logEntry.password !== import.meta.env.VITE_ENTRY_PASSWORD) {
      setAlertMessage("Incorrect password");
      console.error("Incorrect password");
      return;
    } else if (!logEntry.date || !logEntry.mileage || !logEntry.gallons) {
      setAlertMessage("Missing required fields");
      console.error("Missing required fields");
      return;
    } else {
      try {
        const response = await fetch(
          "https://smiles-per-gallon-api.vercel.app/create",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: logEntry.date?.format("MM/DD/YYYY"),
              mileage: Number(logEntry.mileage),
              gallons: Number(logEntry.gallons),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add entry");
        }

        const data = await response.json();
        console.log("Entry added successfully:", data);
        resetState();
      } catch (error) {
        console.error("Error adding entry:", error);
        setAlertMessage("Failed to add entry. Please try again.");
      }
    }
  };

  return (
    <>
      <DatePicker
        label="Date"
        value={logEntry.date}
        onChange={handleDateChange}
      />
      <TextField
        label="Mileage"
        variant="outlined"
        fullWidth
        margin="normal"
        slotProps={{ input: { type: "number" } }}
        value={logEntry.mileage}
        onChange={(e) => handleInputChange(e, "mileage")}
      />
      <TextField
        label="Gallons"
        variant="outlined"
        fullWidth
        margin="normal"
        slotProps={{ input: { type: "number" } }}
        value={logEntry.gallons}
        onChange={(e) => handleInputChange(e, "gallons")}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        slotProps={{ input: { type: "password" } }}
        value={logEntry.password}
        onChange={(e) => handleInputChange(e, "password")}
      />
      {alertMessage && (
        <Box my={2}>
          <Alert severity="error">{alertMessage}</Alert>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddEntry}
      >
        Add Entry
      </Button>
    </>
  );
};

export default LogEntry;

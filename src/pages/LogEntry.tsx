import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface LogEntryState {
  date: Dayjs | null;
  mileage: string;
  gallons: string;
}

const LogEntry: React.FC = () => {
  const [logEntry, setLogEntry] = useState<LogEntryState>({
    date: dayjs(),
    mileage: "",
    gallons: "",
  });

  const handleDateChange = (date: Dayjs | null) => {
    setLogEntry((prev) => ({
      ...prev,
      date: date,
    }));
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

  const handleAddEntry = () => {
    // Handle log entry logic here
    console.log("Date:", logEntry.date);
    console.log("Mileage:", logEntry.mileage);
    console.log("Gallons:", logEntry.gallons);
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
        value={logEntry.mileage}
        onChange={(e) => handleInputChange(e, "mileage")}
      />
      <TextField
        label="Gallons"
        variant="outlined"
        fullWidth
        margin="normal"
        value={logEntry.gallons}
        onChange={(e) => handleInputChange(e, "gallons")}
      />
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

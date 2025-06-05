import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box, TextField } from "@mui/material";

const NewNotePage: React.FC = () => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [response, setResponse] = useState<string>("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/canvassing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, notes, email }),
      });
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
      // Clear form after successful submission
      setName("");
      setNotes("");
      setEmail("");
      // Navigate back to home page after successful submission
      navigate("/");
    } catch (error) {
      setResponse("Error: " + error);
    }
  };

  return (
    <Container maxWidth="sm" component="main" sx={{ flexGrow: 1, py: 4 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Note
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          aria-label="Add new canvassing note"
        >
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            id="name-input"
            aria-required="true"
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            margin="normal"
            required
            id="email-input"
            aria-required="true"
            error={!!emailError}
            helperText={emailError}
            type="email"
          />
          <TextField
            fullWidth
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            required
            id="notes-input"
            aria-required="true"
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            aria-label="Save new note"
          >
            Save Note
          </Button>
        </Box>

        {response && (
          <Box
            component="section"
            aria-label="API Response"
            sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Response:
            </Typography>
            <pre style={{ whiteSpace: "pre-wrap" }}>{response}</pre>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default NewNotePage;

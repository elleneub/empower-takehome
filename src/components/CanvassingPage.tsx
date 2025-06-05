import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

interface CanvassingNote {
  id: number;
  name: string;
  notes: string;
  email?: string;
  created_at: string;
}

const CanvassingPage: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [canvassingNotes, setCanvassingNotes] = useState<CanvassingNote[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/canvassing");
      const data = await response.json();
      setCanvassingNotes(data);
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Error: " + error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/canvassing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, notes }),
      });
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
      // Clear form after successful submission
      setName("");
      setNotes("");
      // Refresh the notes list
      fetchNotes();
    } catch (error) {
      setResponse("Error: " + error);
    }
  };

  return (
    <Container maxWidth="sm" component="main">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Canvassing Notes
        </Typography>

        <Box
          component="section"
          aria-labelledby="add-note-heading"
          sx={{ mb: 4 }}
        >
          <Typography
            variant="h6"
            component="h2"
            id="add-note-heading"
            gutterBottom
          >
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
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
              Save Note
            </Button>
          </Box>
        </Box>

        <Box
          component="section"
          aria-labelledby="notes-list-heading"
          sx={{ mb: 4 }}
        >
          <Typography
            variant="h6"
            component="h2"
            id="notes-list-heading"
            gutterBottom
          >
            All Notes
          </Typography>
          <Button variant="contained" onClick={fetchNotes} sx={{ mb: 2 }}>
            Refresh Notes
          </Button>
          <List aria-label="List of canvassing notes">
            {canvassingNotes.map((note, index) => (
              <React.Fragment key={note.id}>
                <ListItem>
                  <ListItemText
                    primary={note.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {new Date(note.created_at).toLocaleString()}
                        </Typography>
                        <br />
                        {note.notes}
                      </>
                    }
                  />
                </ListItem>
                {index < canvassingNotes.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {canvassingNotes.length === 0 && (
              <ListItem>
                <ListItemText primary="No notes found" />
              </ListItem>
            )}
          </List>
        </Box>

        {/* TODO: Remove response display area after confirming everything works */}
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

export default CanvassingPage;

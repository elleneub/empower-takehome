import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

interface CanvassingNote {
  id: number;
  name: string;
  notes: string;
  email?: string;
  created_at: string;
}

const NotesPage: React.FC = () => {
  const [canvassingNotes, setCanvassingNotes] = useState<CanvassingNote[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/canvassing");
      const data = await response.json();
      setCanvassingNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="sm" component="main" sx={{ flexGrow: 1, py: 4 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Canvassing Notes
        </Typography>
        <Button
          variant="contained"
          onClick={fetchNotes}
          sx={{ mb: 2 }}
          aria-label="Refresh notes list"
        >
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
    </Container>
  );
};

export default NotesPage;

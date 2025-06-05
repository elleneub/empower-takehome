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
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface CanvassingNote {
  id: number;
  name: string;
  notes: string;
  email: string;
  created_at: string;
}

const NotesPage: React.FC = () => {
  const [canvassingNotes, setCanvassingNotes] = useState<CanvassingNote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<CanvassingNote[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/canvassing");
      const data = await response.json();
      setCanvassingNotes(data);
      setFilteredNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();
    const filtered = canvassingNotes.filter(
      (note) =>
        note.name.toLowerCase().includes(searchLower) ||
        note.notes.toLowerCase().includes(searchLower) ||
        note.email.toLowerCase().includes(searchLower)
    );
    setFilteredNotes(filtered);
  }, [searchQuery, canvassingNotes]);

  return (
    <Container maxWidth="sm" component="main" sx={{ flexGrow: 1, py: 4 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Canvassing Notes
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {/* 
            Note: Using InputProps instead of slots API as TextField doesn't yet fully support the new slots API.
            See: https://mui.com/material-ui/api/text-field/#slots
            Once slots API is fully supported, we can migrate to:
            slots={{
              startAdornment: <InputAdornment>...</InputAdornment>
            }}
          */}
          <TextField
            fullWidth
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{
              "aria-label": "Search notes",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={fetchNotes}
            aria-label="Refresh notes list"
          >
            Refresh
          </Button>
        </Box>
        <List aria-label="List of canvassing notes">
          {filteredNotes.map((note, index) => (
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
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Email: {note.email}
                      </Typography>
                      <br />
                      {note.notes}
                    </>
                  }
                />
              </ListItem>
              {index < filteredNotes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {filteredNotes.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  searchQuery ? "No matching notes found" : "No notes found"
                }
              />
            </ListItem>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default NotesPage;

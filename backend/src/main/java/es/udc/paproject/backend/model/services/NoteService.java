package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Note;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface NoteService {
    
    Note addNoteToPlayer(Long playerId, String title, String description, LocalDateTime noteDate) throws InstanceNotFoundException;

    List<Note> findNotesByPlayer(Long playerId) throws InstanceNotFoundException;

    void removeNote(Long noteId) throws InstanceNotFoundException;

    Note updateNote(Long noteId, String title, String description) throws InstanceNotFoundException;
}
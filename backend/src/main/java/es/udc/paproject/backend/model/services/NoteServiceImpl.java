package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Note;
import es.udc.paproject.backend.model.entities.NoteDao;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class NoteServiceImpl implements NoteService {


    @Autowired
    private NoteDao noteDao;

    @Autowired
    private PlayerDao playerDao;

    @Override
    public Note addNoteToPlayer(Long playerId, String title, String description, LocalDateTime noteDate)
            throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        Player player = playerDao.findById(playerId).get();
        Note note = new Note(title, description, noteDate, player);

        return note;
    }

    @Override
    public List<Note> findNotesByPlayer(Long playerId) throws InstanceNotFoundException {
        
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<Note> notes = new ArrayList<>();
        notes = noteDao.findByPlayerId(playerId);

        if (notes.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.note");
        }

        return notes;
    }

    @Override
    public void removeNote(Long noteId) throws InstanceNotFoundException {

        if (!noteDao.existsById(noteId)) {
            throw new InstanceNotFoundException("project.entities.note");
        }
        Note note = noteDao.findById(noteId).get();
        noteDao.delete(note);
    }

    @Override
    public Note updateNote(Long noteId, String title, String description) throws InstanceNotFoundException {
        if (!noteDao.existsById(noteId)) {
            throw new InstanceNotFoundException("project.entities.note");
        }

        Note note = noteDao.findById(noteId).get();

        note.setTitle(title);
        note.setDescription(description);
        return note;
    }
    
}
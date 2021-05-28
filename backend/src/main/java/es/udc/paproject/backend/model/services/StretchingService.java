package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Stretching;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface StretchingService {
    
    Stretching addStretching(String stretchingName, String description, String stretchingType) throws InstanceNotFoundException;

    void addStretchingToPlayer(Long playerId, Long stretchingId);

    void addStretchingToTraining(Long trainingId, Long stretchingId);

    void addStretchingToMatch(Long matchId, Long stretchingId);

    Stretching findStretchingById(Long stretchingId);

    List<Stretching> findAllStretchings();

    List<Stretching> findStretchingsByType(String Stretching);

    List<Stretching> findStretchingsByPlayerId(Long playerId);

    List<Stretching> findStretchingsByTrainingId(Long trainingId);

    List<Stretching> findStretchingsByMatchId(Long matchId);

    void removeStretching(Long stretchingId);

    void removeStretchingToPlayer(Long stretchingId, Long playerId);

    void removeStretchingToTraining(Long stretchingId, Long trainingId);

    void removeStretchingToMatch(Long stretchingId, Long matchId);

    Stretching updatStretching(Long trainingId, String stretchingName, String description, String stretchingType);
}
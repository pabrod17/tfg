package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Stretching;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public class StretchingServiceImpl implements StretchingService {

    @Override
    public Stretching addStretching(String stretchingName, String description, String stretchingType)
            throws InstanceNotFoundException {

        if (!stretchingType.equals("Hamstrings") && !stretchingType.equals("Buttocks") && !stretchingType.equals("Adductors")
                && !stretchingType.equals("Shoulder") && !stretchingType.equals("Quadriceps") && !stretchingType.equals("Back")) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        return null;
    }

    @Override
    public void addStretchingToPlayer(Long playerId, Long stretchingId) {
        // TODO Auto-generated method stub

    }

    @Override
    public void addStretchingToTraining(Long trainingId, Long stretchingId) {
        // TODO Auto-generated method stub

    }

    @Override
    public void addStretchingToMatch(Long matchId, Long stretchingId) {
        // TODO Auto-generated method stub

    }

    @Override
    public Stretching findStretchingById(Long stretchingId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Stretching> findAllStretchings() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Stretching> findStretchingsByType(String Stretching) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Stretching> findStretchingsByPlayerId(Long playerId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Stretching> findStretchingsByTrainingId(Long trainingId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Stretching> findStretchingsByMatchId(Long matchId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void removeStretching(Long stretchingId) {
        // TODO Auto-generated method stub

    }

    @Override
    public void removeStretchingToPlayer(Long stretchingId, Long playerId) {
        // TODO Auto-generated method stub

    }

    @Override
    public void removeStretchingToTraining(Long stretchingId, Long trainingId) {
        // TODO Auto-generated method stub

    }

    @Override
    public void removeStretchingToMatch(Long stretchingId, Long matchId) {
        // TODO Auto-generated method stub

    }

    @Override
    public Stretching updatStretching(Long trainingId, String stretchingName, String description,
            String stretchingType) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
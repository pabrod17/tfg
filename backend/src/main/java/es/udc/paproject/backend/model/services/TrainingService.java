package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

public interface TrainingService {
    
    //Busco un SeasonTeam con el teamId y cojo ese
    Training addTraining(Long teamId, Long seasonId, LocalDateTime trainingDate, Integer durationMinutes, String description, String objective) throws InstanceNotFoundException;

    void addPlayerToTraining(Long trainingId, Long playerId) throws InstanceNotFoundException;

    Training findTrainingById(Long trainingId) throws InstanceNotFoundException;

    List<Training> findTrainingsByTwoDatesAndTeamIdOrSeasonId(Long teamId, Long seasonId, LocalDateTime startDate, LocalDateTime endDate) throws StartDateAfterEndDateException, InstanceNotFoundException;

    List<Training> findTrainingsByTeamId(Long teamId) throws InstanceNotFoundException;

    List<Training> findTrainingsBySeasonId(Long seasonId) throws InstanceNotFoundException;

    List<Training> findTrainingsByTeamIdAndSeasonId(Long teamId, Long seasonId) throws InstanceNotFoundException;

    void removeTraining(Long trainingId) throws InstanceNotFoundException;

    Training updateTraining(Long trainingId, LocalDateTime trainingDate, Integer durationMinutes, String description, String objective) throws InstanceNotFoundException;
}

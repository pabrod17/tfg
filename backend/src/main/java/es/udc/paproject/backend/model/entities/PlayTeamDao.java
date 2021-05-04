package es.udc.paproject.backend.model.entities;

import java.util.List;

//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayTeamDao extends PagingAndSortingRepository<PlayTeam, Long> {
    
    List<PlayTeam> findByTeamId(Long teamId);

    //@Query("SELECT p FROM PlayTeam p JOIN SeasonTeam s ON p.teamId=s.teamId WHERE s.userId=?1")
    //List<PlayTeam> findByUserId(Long userId);
}
package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayerDao extends PagingAndSortingRepository<Player, Long>{

    List<Player> findByTeamId(Long teamId);

    @Query("SELECT p FROM Player p WHERE p.teamId = ?1 AND p.position = ?2")
    List<Player> findByTeamIdAndPosition(Long teamId, String position);
    
}
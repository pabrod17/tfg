package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SeasonTeamDao extends PagingAndSortingRepository<SeasonTeam, Long>{

    //Aqui accedo a los seasonTeam de una temporada y de ahi saco los teams de una temporada
    @Query("SELECT s FROM SeasonTeam s WHERE seasonId = ?1")
    List<SeasonTeam> findSeasonTeamsBySeasonId(Long seasonId);

    @Query("SELECT s FROM SeasonTeam s WHERE teamId = ?1")
    List<SeasonTeam> findSeasonTeamsByTeamId(Long teamId);

    boolean existsByTeamId(Long teamId);

    void deleteByTeamId(Long teamId);

    void deleteBySeasonId(Long seasonId);
}
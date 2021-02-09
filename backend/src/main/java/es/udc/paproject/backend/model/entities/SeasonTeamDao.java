package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface SeasonTeamDao extends PagingAndSortingRepository<SeasonTeam, Long>{

    List<Team> findBySeasonId(Long seasonId);

    boolean existsByTeamId(Long teamId);

    void deleteByTeamId(Long teamId);

    void deleteBySeasonId(Long seasonId);
}
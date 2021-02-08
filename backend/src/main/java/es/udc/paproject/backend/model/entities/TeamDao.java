package es.udc.paproject.backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TeamDao extends PagingAndSortingRepository<Team, Long>{

    Team findByTeamName(String teamName);
}
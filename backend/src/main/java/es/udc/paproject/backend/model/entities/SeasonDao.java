package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SeasonDao extends PagingAndSortingRepository<Season, Long> {

    @Query("SELECT s FROM Season s WHERE s.startDate >= ?1 AND s.endDate <= ?2")
    List<Season> findSeasons(LocalDateTime startDate, LocalDateTime endDate);
}
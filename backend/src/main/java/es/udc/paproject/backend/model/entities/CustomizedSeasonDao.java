package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomizedSeasonDao {

    List<Season> findSeasons(Long seasonId, LocalDateTime startDate, LocalDateTime endDate);

}
package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomizedSeasonDao {

    List<Season> find(LocalDateTime startDate, LocalDateTime endDate);

}
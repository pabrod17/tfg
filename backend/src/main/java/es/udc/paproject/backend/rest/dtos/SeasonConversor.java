package es.udc.paproject.backend.rest.dtos;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import es.udc.paproject.backend.model.entities.Season;

public class SeasonConversor {

    public SeasonConversor() {
    }
    
    public final static SeasonDto toSeasonDto(Season season){
        return new SeasonDto(season.getId(), toMillis(season.getStartDate()), toMillis(season.getEndDate()), 
        season.getCalendario());
    }

    private final static long toMillis(LocalDateTime date) {
		return date.truncatedTo(ChronoUnit.MINUTES).atZone(ZoneOffset.systemDefault()).toInstant().toEpochMilli();
	}
}
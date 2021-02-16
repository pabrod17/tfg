package es.udc.paproject.backend.rest.dtos;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Season;

public class SeasonConversor {

    public SeasonConversor() {
    }
    
    public final static SeasonDto toSeasonDto(Season season){
        return new SeasonDto(season.getId(), toMillis(season.getStartDate()), toMillis(season.getEndDate()), 
        season.getCalendario());
    }

    public final static List<SeasonDto> toSeasonDtos(List<Season> seasons){
		return seasons.stream().map(c -> toSeasonDto(c)).collect(Collectors.toList());
    }

    private final static long toMillis(LocalDateTime date) {
		return date.truncatedTo(ChronoUnit.MINUTES).atZone(ZoneOffset.systemDefault()).toInstant().toEpochMilli();
	}
}
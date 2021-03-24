package es.udc.paproject.backend.rest.controllers;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.SeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDtos;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeason;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonUpdate;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toLocalDateTime;;




@RestController
@RequestMapping("/seasons")
public class SeasonController {

	private final static String STARTDATE_AFTER_ENDDATE_EXCEPTION_CODE = "project.exceptions.startDateAfterEndDateException";
	
    @Autowired
	private MessageSource messageSource;

    @Autowired
    private SeasonService seasonService;

	@ExceptionHandler(StartDateAfterEndDateException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectLoginException(StartDateAfterEndDateException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(STARTDATE_AFTER_ENDDATE_EXCEPTION_CODE, null,
        STARTDATE_AFTER_ENDDATE_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("")
    public List<SeasonDto> findAllSeasons(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toSeasonDtos(seasonService.findAllSeasons(userId));
    }

    @GetMapping("/toTeam/{teamId}")
    public List<SeasonDto> findSeasonsToTeam(@RequestAttribute Long userId, @PathVariable Long teamId) throws InstanceNotFoundException {
        return toSeasonDtos(seasonService.findSeasonsToTeam(userId, teamId));
    }

    @GetMapping("/betweenDates")
    public List<SeasonDto> findSeasonsBetweenTwoDates(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, 
    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate, @RequestAttribute Long userId)
            throws InstanceNotFoundException, StartDateAfterEndDateException {
        return toSeasonDtos(seasonService.findSeasonsBetweenTwoDates(userId, toLocalDateTime(startDate), toLocalDateTime(endDate)));
    }

    @GetMapping("/season/{id}")
    public SeasonDto findSeasonById(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException {
        return toSeasonDto(seasonService.findSeasonById(userId, id));
    }

    @PostMapping("/addSeason/")
    public SeasonDto addSeason(@RequestAttribute Long userId, @RequestBody SeasonDto seasonDto)
            throws InstanceNotFoundException, StartDateAfterEndDateException {
        Season season = toSeason(seasonDto);
        return toSeasonDto(seasonService.addSeason(userId, season));
    }

    @PutMapping("/update/{id}")
    public SeasonDto updateSeason(@RequestAttribute Long userId, @PathVariable Long id, @RequestBody SeasonDto seasonDto) throws InstanceNotFoundException {
        Season season = toSeasonUpdate(seasonDto);
        return toSeasonDto(seasonService.updateSeason(userId, season));
    }

    @DeleteMapping("/remove/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeSeason(@RequestAttribute Long userId, @PathVariable Long id) throws InstanceNotFoundException {
        seasonService.removeSeason(userId, id);
    }
}
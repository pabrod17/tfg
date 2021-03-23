package es.udc.paproject.backend.rest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.rest.dtos.SeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDtos;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeason;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonUpdate;;



@RestController
@RequestMapping("/seasons")
public class SeasonController {

    @Autowired
    private SeasonService seasonService;

    @GetMapping("")
    public List<SeasonDto> findAllSeasons(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toSeasonDtos(seasonService.findAllSeasons(userId));
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

    //findTeamsToSeason

    //findSeasonsBetweenTwoDates

}
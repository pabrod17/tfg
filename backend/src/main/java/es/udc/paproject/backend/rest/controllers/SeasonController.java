package es.udc.paproject.backend.rest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.rest.dtos.SeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDtos;

@RestController
@RequestMapping("/seasons")
public class SeasonController {

    @Autowired
    private SeasonService seasonService;

    @GetMapping("/all")
    public List<SeasonDto> findAllSeasons() {
        return toSeasonDtos(seasonService.findAllSeasons());
    }

    @GetMapping("/{id}")
    public SeasonDto findSeasonById(@PathVariable Long id) throws InstanceNotFoundException {
        return toSeasonDto(seasonService.findSeasonById(id));
    }


}
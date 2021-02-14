package es.udc.paproject.backend.test.model.services;

import static org.junit.Assert.assertEquals;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.SeasonService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class SeasonServiceTest {

    //private final Long NON_EXISTENT_ID = new Long(-1);
    private final LocalDateTime startDate = LocalDateTime.of(2015, 5, 12, 15, 56);    
    private final LocalDateTime endDate = LocalDateTime.of(2022, 5, 12, 15, 56);    



    @Autowired
    private SeasonService seasonService;

    private Season createSeason(){

        LocalDateTime startDate = LocalDateTime.of(2020, 5, 12, 15, 56);    
        LocalDateTime endDate = LocalDateTime.of(2021, 2, 14, 15, 56);    
        return new Season(startDate, endDate, "Calendario");
    }
    private Season createSeason2(){

        LocalDateTime startDate = LocalDateTime.of(2020, 7, 12, 15, 56);    
        LocalDateTime endDate = LocalDateTime.of(2021, 7, 14, 15, 56);    
        return new Season(startDate, endDate, "Calendario");
    }
    private Season createSeason3(){

        LocalDateTime startDate = LocalDateTime.of(2020, 8, 12, 15, 56);    
        LocalDateTime endDate = LocalDateTime.of(2021, 8, 14, 15, 56);    
        return new Season(startDate, endDate, "Calendario");
    }

    @Test
    public void testAddSeasonAndFindSeasonById() throws InstanceNotFoundException {

        Season season = createSeason();
        seasonService.addSeason(season);

        Long seasonId = season.getId();
        Season foundSeason = seasonService.findSeasonById(seasonId);

        assertEquals(season, foundSeason);
    }

    @Test
    public void testAddSeasonAndFindSeasonBetweenTwoDates() throws InstanceNotFoundException {

        Season season = createSeason();
        seasonService.addSeason(season);
        Season season2 = createSeason2();
        seasonService.addSeason(season2);
        Season season3 = createSeason3();
        seasonService.addSeason(season3);


        List<Season> seasons = seasonService.findSeasonsBetweenTwoDates(startDate, endDate);
        assertEquals(3, seasons.size());
    }
    //hIbernate jpa dates
//FALLA POR LA CREACION DE LA TABLA
    //Ya que en el create de la tabla en el .sql
        //Tengo las fechas como VARCHAR!!!!!
        //https://thorben-janssen.com/hibernate-jpa-date-and-time/#Mapping_javautil_classes
        //https://thorben-janssen.com/hibernate-jpa-date-and-time/
}
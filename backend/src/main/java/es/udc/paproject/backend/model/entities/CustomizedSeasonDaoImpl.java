package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class CustomizedSeasonDaoImpl implements CustomizedSeasonDao {

    @PersistenceContext
	private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public List<Season> findSeasons(Long seasonId, LocalDateTime startDate, LocalDateTime endDate) {

        String queryString = "SELECT s FROM Season s";

        if ((startDate != null) && (endDate != null)) {
            queryString += " WHERE ";
            queryString += " s.startdate > :startDate ";
            queryString += " s.enddate > endDate ";
        }

        Query query = entityManager.createQuery(queryString);

        List<Season> seasons = query.getResultList();


        return seasons;
    }
    
}
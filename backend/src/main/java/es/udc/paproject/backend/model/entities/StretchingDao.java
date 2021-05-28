package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface StretchingDao extends PagingAndSortingRepository<Stretching, Long> {

    List<Stretching> findByStretchingType(String stretchingType);
}
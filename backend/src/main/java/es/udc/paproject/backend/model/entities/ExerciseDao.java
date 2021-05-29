package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExerciseDao extends PagingAndSortingRepository<Exercise, Long>{

    List<Exercise> findByExerciseType(String exerciseType);
}
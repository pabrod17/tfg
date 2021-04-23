package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Lesion;

public interface LesionService {
    
    //Vamos a hacer que al añadir una lesion nueva se añada a la bd sin hacer nada mas.
        //Asi cualquier usuario podria ver y añadir lesiones. Como si fuera una bd comun
        //Igual hare con los ejercicios en los entrenamientos
    //Luego añado la lesion a playerLesion con playerId null y ale
    Lesion addLesion(Long playerId, String lesionName, String description, String medication, String lesionType);

    void addLesionToPlayer(Long playerId, Long lesionId);
    //miro que exista la lesion en Lesion
    //miro que exista jugador con id normal en general
        //añado fila en playerLesion

    List<Lesion> findAllLesion();
    //BUSCAR TODAS!!!! LAS LESIONES LAS GENERALES Y LAS QUE SE CREEN LUEGO POR CUALQUIER USUARIO
    //findall en Lesion no en playerLesion
        //quito repes

    List<Lesion> findLesionByType(String lesionType);

    void removeLesion(Long lesionId);

    Lesion updateLesion(String lesionName, String description, String medication, String lesionType);

}
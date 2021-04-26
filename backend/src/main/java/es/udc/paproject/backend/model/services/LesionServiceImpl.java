package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Lesion;
import es.udc.paproject.backend.model.entities.LesionDao;
import es.udc.paproject.backend.model.entities.LesionType;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.entities.PlayerLesion;
import es.udc.paproject.backend.model.entities.PlayerLesionDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedLesionException;

@Service
@Transactional
public class LesionServiceImpl implements LesionService {

    @Autowired
    private LesionDao lesionDao;

    @Autowired
    private PlayerLesionDao playerLesionDao;

    @Autowired
    private PlayerDao playerDao;

    @Override
    public Lesion addLesion(Long playerId, String lesionName, String description, String medication, String lesionType)
            throws InstanceNotFoundException {

        if (!lesionType.equals("Muscle") && !lesionType.equals("Tendon") && !lesionType.equals("Joint")
                && !lesionType.equals("Spine") && !lesionType.equals("Psychological")) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }
        LesionType lesionTypeEnum = LesionType.valueOf(lesionType);

        if(playerId == null){
            Lesion lesion = new Lesion(lesionName, description, medication, lesionTypeEnum);
            return lesion;
        }

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        
        Player player = playerDao.findById(playerId).get();
        Lesion lesion = new Lesion(lesionName, description, medication, lesionTypeEnum);
        PlayerLesion playerLesion = new PlayerLesion(lesion, player);

        lesionDao.save(lesion);
        playerLesionDao.save(playerLesion);

        return lesion;
    }

    @Override
    public void addLesionToPlayer(Long playerId, Long lesionId) throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        Player player = playerDao.findById(playerId).get();
        Lesion lesion = lesionDao.findById(lesionId).get();
        PlayerLesion playerLesion = new PlayerLesion(lesion, player);

        playerLesionDao.save(playerLesion);
    }

    @Override
    public List<Lesion> findAllLesion() throws InstanceNotFoundException {

        List<Lesion> lesions = new ArrayList<>();
        lesions = (List<Lesion>) lesionDao.findAll();

        if (lesions.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        return lesions;
    }

    @Override
    public List<Lesion> findLesionByType(String lesionType) throws InstanceNotFoundException {

        List<Lesion> lesions = new ArrayList<>();
        lesions = lesionDao.findByLesionType(lesionType);

        if (lesions.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        return null;
    }

    @Override
    public void removeLesion(Long lesionId) throws InstanceNotFoundException, UsedLesionException {
        
        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        List<PlayerLesion> playerLesions = (List<PlayerLesion>) playerLesionDao.findAll();

        for (PlayerLesion playerLesion : playerLesions) {
            if(playerLesion.getLesion() != null && playerLesion.getLesion().getId() == lesionId){
                throw new UsedLesionException(playerLesion.getLesion().getLesionName());
            }
        }

        Lesion lesion = lesionDao.findById(lesionId).get();

        lesionDao.delete(lesion);
    }

    @Override
    public Lesion updateLesion(Long lesionId, String lesionName, String description, String medication, String lesionType)
            throws InstanceNotFoundException {

        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        if (!lesionType.equals("Muscle") && !lesionType.equals("Tendon") && !lesionType.equals("Joint")
                && !lesionType.equals("Spine") && !lesionType.equals("Psychological")) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        Lesion lesion = lesionDao.findById(lesionId).get();

        lesion.setLesionName(lesionName);
        lesion.setDescription(description);
        lesion.setMedication(medication);
        LesionType lesionTypeEnum = LesionType.valueOf(lesionType);
        lesion.setLesionType(lesionTypeEnum);
        lesionDao.save(lesion);
        
        return lesion;
    }
}
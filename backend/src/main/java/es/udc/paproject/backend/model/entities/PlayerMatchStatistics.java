package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class PlayerMatchStatistics {
    
    private Long id;
    private Player player;
    private Match match;
    
    private Integer totalPoints;
    private Float minutes;
    private Integer threePointShots;
    private Integer setShots;
    private Integer freeShots;

    private Integer failThreePointShots;
    private Integer failSetShots;
    private Integer failFreeShots;

    private Integer rebounds;
    private Integer blockedShot;
    private Integer assists;
    private Integer personalFouls;
    private Integer technicalFouls;
    private Integer unsportsmanlikeFouls;

    public PlayerMatchStatistics() {
    }

    public PlayerMatchStatistics(Player player, Match match, Integer totalPoints, Float minutes,
            Integer threePointShots, Integer setShots, Integer freeShots, Integer failThreePointShots,
            Integer failSetShots, Integer failFreeShots, Integer rebounds, Integer blockedShot, Integer assists,
            Integer personalFouls, Integer technicalFouls, Integer unsportsmanlikeFouls) {
        this.player = player;
        this.match = match;
        this.totalPoints = totalPoints;
        this.minutes = minutes;
        this.threePointShots = threePointShots;
        this.setShots = setShots;
        this.freeShots = freeShots;
        this.failThreePointShots = failThreePointShots;
        this.failSetShots = failSetShots;
        this.failFreeShots = failFreeShots;
        this.rebounds = rebounds;
        this.blockedShot = blockedShot;
        this.assists = assists;
        this.personalFouls = personalFouls;
        this.technicalFouls = technicalFouls;
        this.unsportsmanlikeFouls = unsportsmanlikeFouls;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playerId", nullable = true)
    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matchId", nullable = true)
    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public Float getMinutes() {
        return minutes;
    }

    public void setMinutes(Float minutes) {
        this.minutes = minutes;
    }

    public Integer getThreePointShots() {
        return threePointShots;
    }

    public void setThreePointShots(Integer threePointShots) {
        this.threePointShots = threePointShots;
    }

    public Integer getSetShots() {
        return setShots;
    }

    public void setSetShots(Integer setShots) {
        this.setShots = setShots;
    }

    public Integer getFreeShots() {
        return freeShots;
    }

    public void setFreeShots(Integer freeShots) {
        this.freeShots = freeShots;
    }

    public Integer getFailThreePointShots() {
        return failThreePointShots;
    }

    public void setFailThreePointShots(Integer failThreePointShots) {
        this.failThreePointShots = failThreePointShots;
    }

    public Integer getFailSetShots() {
        return failSetShots;
    }

    public void setFailSetShots(Integer failSetShots) {
        this.failSetShots = failSetShots;
    }

    public Integer getFailFreeShots() {
        return failFreeShots;
    }

    public void setFailFreeShots(Integer failFreeShots) {
        this.failFreeShots = failFreeShots;
    }

    public Integer getRebounds() {
        return rebounds;
    }

    public void setRebounds(Integer rebounds) {
        this.rebounds = rebounds;
    }

    public Integer getBlockedShot() {
        return blockedShot;
    }

    public void setBlockedShot(Integer blockedShot) {
        this.blockedShot = blockedShot;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public Integer getPersonalFouls() {
        return personalFouls;
    }

    public void setPersonalFouls(Integer personalFouls) {
        this.personalFouls = personalFouls;
    }

    public Integer getTechnicalFouls() {
        return technicalFouls;
    }

    public void setTechnicalFouls(Integer technicalFouls) {
        this.technicalFouls = technicalFouls;
    }

    public Integer getUnsportsmanlikeFouls() {
        return unsportsmanlikeFouls;
    }

    public void setUnsportsmanlikeFouls(Integer unsportsmanlikeFouls) {
        this.unsportsmanlikeFouls = unsportsmanlikeFouls;
    }
}
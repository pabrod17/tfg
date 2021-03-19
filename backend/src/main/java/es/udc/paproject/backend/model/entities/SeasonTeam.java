package es.udc.paproject.backend.model.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class SeasonTeam {
    
    private Long id;
    private Season season;
    private Team team;
    private User user;    

    public SeasonTeam() {
    }

    public SeasonTeam(Season season, Team team, User user) {
        this.season = season;
        this.team = team;
        this.user = user;
    }

    public SeasonTeam(Team team, User user) {
        this.team = team;
        this.user = user;
    }

    public SeasonTeam(Season season, User user) {
        this.season = season;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    //cascada para borrar as referencias de dita season na taboa intermedia
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "seasonId", nullable = true)
    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }
    
    //cascada para borrar as referencias de dita season na taboa intermedia
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "teamId", nullable = true)
    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = true)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
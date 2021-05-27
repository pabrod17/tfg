package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Match {
    
    private Long id;
    private LocalDateTime matchDate;
    private String rival;
    private SeasonTeam seasonTeam;
    private MatchStatistics statistics;
    

    public Match() {
    }

    public Match(LocalDateTime matchDate, String rival, SeasonTeam seasonTeam) {
        this.matchDate = matchDate;
        this.rival = rival;
        this.seasonTeam = seasonTeam;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public String getRival() {
        return rival;
    }

    public void setRival(String rival) {
        this.rival = rival;
    }

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name= "seasonTeamId", nullable = true)
    public SeasonTeam getSeasonTeam() {
        return seasonTeam;
    }

    public void setSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeam = seasonTeam;
    }

	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name= "matchStatisticsId", nullable = true)
    public MatchStatistics getStatistics() {
        return statistics;
    }

    public void setStatistics(MatchStatistics statistics) {
        this.statistics = statistics;
    }
}
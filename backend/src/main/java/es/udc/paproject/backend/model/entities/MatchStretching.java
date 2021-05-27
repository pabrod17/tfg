package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MatchStretching {
    
    private Long id;
    private Match match;
    private Stretching stretching;

    public MatchStretching() {
    }

    public MatchStretching(Match match, Stretching stretching) {
        this.match = match;
        this.stretching = stretching;
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
    @JoinColumn(name = "matchId", nullable = true)
    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stretchingId", nullable = true)
    public Stretching getStretching() {
        return stretching;
    }

    public void setStretching(Stretching stretching) {
        this.stretching = stretching;
    }

    
}
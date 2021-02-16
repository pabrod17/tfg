package es.udc.paproject.backend.rest.dtos;

public class SeasonDto {
    
    private Long id;
    private Long startDate;
    private Long endDate;
    private String calendario;

    public SeasonDto() {
    }

    public SeasonDto(Long id, Long startDate, Long endDate, String calendario) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.calendario = calendario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStartDate() {
        return startDate;
    }

    public void setStartDate(Long startDate) {
        this.startDate = startDate;
    }

    public Long getEndDate() {
        return endDate;
    }

    public void setEndDate(Long endDate) {
        this.endDate = endDate;
    }

    public String getCalendario() {
        return calendario;
    }

    public void setCalendario(String calendario) {
        this.calendario = calendario;
    }
}
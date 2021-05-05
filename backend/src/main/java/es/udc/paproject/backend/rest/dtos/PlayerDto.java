package es.udc.paproject.backend.rest.dtos;

public class PlayerDto {
    
    private Long id;
    private String playerName;
    private String primaryLastName;
    private String secondLastName;
    private String position;
    private String trends;
    private String phoneNumber;
    private String email;
    private String dni;
    private Long teamId;

    public PlayerDto() {
    }

    public PlayerDto(Long id, String playerName, String primaryLastName, String secondLastName, String position,
            String trends, String phoneNumber, String email, String dni, Long teamId) {
        this.id = id;
        this.playerName = playerName;
        this.primaryLastName = primaryLastName;
        this.secondLastName = secondLastName;
        this.position = position;
        this.trends = trends;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dni = dni;
        this.teamId = teamId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPrimaryLastName() {
        return primaryLastName;
    }

    public void setPrimaryLastName(String primaryLastName) {
        this.primaryLastName = primaryLastName;
    }

    public String getSecondLastName() {
        return secondLastName;
    }

    public void setSecondLastName(String secondLastName) {
        this.secondLastName = secondLastName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getTrends() {
        return trends;
    }

    public void setTrends(String trends) {
        this.trends = trends;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
}
package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class TeamWithSeasonException extends InstanceException {

    public TeamWithSeasonException(String name, Object key) {
        super(name, key);
    }
    
}
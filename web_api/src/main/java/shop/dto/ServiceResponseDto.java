package shop.dto;

import lombok.Data;

@Data
public class ServiceResponseDto {
    public ServiceResponseDto(String message, Object payload) {
        Message = message;
        Payload = payload;
    } public ServiceResponseDto(String message) {
        Message = message;
    }

    public ServiceResponseDto() {

    }

    private String Message;
    private Object Payload;

}

package lab.app;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.GenericType;
import lab.app.dto.ComplaintDTO;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        Client client = ClientBuilder.newClient();
        WebTarget target = client.target("http://localhost:8080/Server-1.0-SNAPSHOT/api/complaints");
        System.out.println("All complaints:");
        getAllComplaints(target);
        System.out.println("Complaint 453:");
        getComplaint(target);
        System.out.println("Close complaint 453:");
        closeComplaint(target);
        System.out.println("Open complaints:");
        getOpenComplaints(target);
        client.close();
    }

    private static void getAllComplaints(WebTarget target) {
        List<ComplaintDTO> complaints = target.request().get(new GenericType<>() {
        });
        for (ComplaintDTO complaint : complaints) {
            System.out.println(complaint);
        }
    }

    private static void getComplaint(WebTarget target) {
        ComplaintDTO complaint = target.path("453").request().get(ComplaintDTO.class);
        System.out.println(complaint);
    }

    private static void closeComplaint(WebTarget target) {
        ComplaintDTO complaint = target.path("453").request().get(ComplaintDTO.class);
        System.out.println("Before: " + complaint);
        complaint.setStatus("closed");
        target.path("453")
                .request()
                .put(Entity.json(complaint), ComplaintDTO.class);
        complaint = target.path("453").request().get(ComplaintDTO.class);
        System.out.println("After: " + complaint);
    }

    private static void getOpenComplaints(WebTarget target) {
        List<ComplaintDTO> complaints = target.queryParam("status", "open")
                .request().get(new GenericType<>() {
                });
        for (ComplaintDTO complaint : complaints) {
            System.out.println(complaint);
        }
    }
}

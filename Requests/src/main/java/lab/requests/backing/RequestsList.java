package lab.requests.backing;

import jakarta.enterprise.context.RequestScoped;
import jakarta.faces.component.html.HtmlDataTable;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Size;
import lab.requests.data.RequestRepository;
import lab.requests.entities.Request;

import java.time.LocalDate;
import java.util.List;

@RequestScoped
@Named
public class RequestsList {
    @Inject
    private RequestRepository requestRepository;

    @Size(min = 3, max = 60, message = "{request.size}")
    private String newRequest;
    private HtmlDataTable requestsDataTable;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @Transactional
    public String addRequest() {
        Request request = new Request();
        request.setRequestDate(LocalDate.now());
        request.setRequestText(newRequest);
        requestRepository.create(request);
        setNewRequest("");
        return null;
    }

    @Transactional
    public String deleteRequest() {
        Request req = (Request) getRequestsDataTable().getRowData();
        requestRepository.remove(req);
        FacesContext context = FacesContext.getCurrentInstance();
        context.renderResponse();
        return null;
    }


    public String getNewRequest() {
        return newRequest;
    }

    public void setNewRequest(String newRequest) {
        this.newRequest = newRequest;
    }

    public HtmlDataTable getRequestsDataTable() {
        return requestsDataTable;
    }

    public void setRequestsDataTable(HtmlDataTable requestsDataTable) {
        this.requestsDataTable = requestsDataTable;
    }
}

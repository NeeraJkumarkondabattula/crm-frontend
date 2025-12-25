import api from "./axios";

export const fetchTickets = () => {
    return api.get("/tickets");
};

export const fetchTicketById = (id) => {
    return api.get(`/tickets/${id}`);
};

export const updateTicketStatus = (ticketId, status) => {
    return api.patch(`/tickets/${ticketId}/status`, { status });
};

export const reassignTicket = (ticketId, newAgentId) => {
    return api.patch(`/tickets/${ticketId}/reassign`, {
        newAgentId
    });
};

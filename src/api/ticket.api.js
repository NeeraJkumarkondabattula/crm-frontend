import api from "./axios";

export const updateTicketStatus = async (ticketId, status) => {
    const res = await api.patch(`/tickets/${ticketId}/status`, { status });
    return res.data;
};

export const fetchTickets = async (params = {}) => {
    const res = await api.get("/tickets", { params });
    return res.data;
};


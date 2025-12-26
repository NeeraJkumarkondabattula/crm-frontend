import api from "./axios";

export const fetchAgents = async () => {
    const res = await api.get("/users?role=agent");
    return res.data;
};

export const assignAgent = async (ticketId, agentId) => {
    const res = await api.patch(`/tickets/${ticketId}/assign`, {
        agentId
    });
    return res.data;
};

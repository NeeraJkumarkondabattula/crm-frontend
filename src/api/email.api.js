import api from "./axios";

export const replyToTicket = async ({ ticketId, bodyText }) => {
    const res = await api.post("/emails/reply", {
        ticketId,
        bodyText
    });
    return res.data;
};

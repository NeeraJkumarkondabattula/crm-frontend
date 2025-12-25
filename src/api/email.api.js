import api from "./axios";

export const replyToTicket = ({ ticketId, bodyText }) => {

    return api.post("/emails/reply", {
        ticketId,
        bodyText
    });
};



import api from "./axios";

export const fetchAgents = () => {
    return api.get("/users?role=agent");
};

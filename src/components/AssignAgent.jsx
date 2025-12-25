import { useEffect, useState } from "react";
import { fetchAgents } from "../api/user.api";
import { reassignTicket } from "../api/ticket.api";

const AssignAgent = ({ ticket, onAssigned }) => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState(false);

    useEffect(() => {
        const loadAgents = async () => {
            const res = await fetchAgents();
            setAgents(res.data);
            setLoading(false);
        };

        loadAgents();
    }, []);

    const handleAssign = async (e) => {
        const agentId = e.target.value;
        if (!agentId) return;

        setAssigning(true);
        try {
            await reassignTicket(ticket._id, agentId);
            onAssigned(agentId);
        } finally {
            setAssigning(false);
        }
    };

    if (loading) return null;

    return (
        <select onChange={handleAssign} disabled={assigning}>
            <option value="">Assign agent</option>
            {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                    {agent.name} ({agent.email})
                </option>
            ))}
        </select>
    );
};

export default AssignAgent;

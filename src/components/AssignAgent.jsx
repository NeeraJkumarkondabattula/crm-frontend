import { useEffect, useState } from "react";
import { fetchAgents, assignAgent } from "../api/user.api";

export default function AssignAgent({ ticketId, onAssigned }) {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAgents().then(setAgents).catch(() => { });
    }, []);

    const handleAssign = async (e) => {
        const agentId = e.target.value;
        if (!agentId) return;

        setLoading(true);
        try {
            await assignAgent(ticketId, agentId);
            onAssigned(agentId);
        } catch {
            alert("Failed to assign agent");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: 12 }}>
            <label style={{ marginRight: 8 }}>Assign Agent:</label>

            <select onChange={handleAssign} disabled={loading}>
                <option value="">Select agent</option>
                {agents.map(a => (
                    <option key={a._id} value={a._id}>
                        {a.email}
                    </option>
                ))}
            </select>
        </div>
    );
}

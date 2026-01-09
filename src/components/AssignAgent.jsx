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
       <div
  style={{
    marginTop: 16,
    padding: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    background: "#fafafa",
    maxWidth: 360
  }}
>
  <div style={{ fontSize: 13, marginBottom: 6 }}>
    Reassign Agent
  </div>

  <select
    onChange={handleAssign}
    disabled={loading}
    style={{
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #d1d5db",
      background: "#ffffff"
    }}
  >
    <option value="">Select agent</option>
    {agents.map(a => (
      <option key={a._id} value={a._id}>
        {a.email}
      </option>
    ))}
  </select>

  {loading && (
    <div style={{ fontSize: 12, marginTop: 6 }}>
      Assigning…
    </div>
  )}
</div>

    );
}

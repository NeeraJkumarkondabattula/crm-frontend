import { useEffect, useState } from "react";
import { fetchTickets } from "../api/ticket.api";

const TicketList = ({ selectedTicketId, onSelect }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const res = await fetchTickets();
                setTickets(res.data);
            } finally {
                setLoading(false);
            }
        };

        loadTickets();
    }, []);

    if (loading) return <div>Loading tickets…</div>;

    return (
        <div style={{ width: 320, borderRight: "1px solid #ddd" }}>
            {tickets.map((ticket) => (
                <div
                    key={ticket._id}
                    onClick={() => onSelect(ticket._id)}
                    style={{
                        padding: 12,
                        cursor: "pointer",
                        background:
                            ticket._id === selectedTicketId ? "#f0f0f0" : "white",
                        borderBottom: "1px solid #eee"
                    }}
                >
                    <div style={{ fontWeight: "bold" }}>
                        {ticket.subject || "(No subject)"}
                    </div>

                    <div style={{ fontSize: 12, color: "#555" }}>
                        {ticket.customerEmail}
                    </div>

                    <div style={{ fontSize: 12 }}>
                        Status: <strong>{ticket.status}</strong>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TicketList;

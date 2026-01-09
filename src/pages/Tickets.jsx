import { useEffect, useState } from "react";
import { fetchTickets } from "../api/ticket.api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const query = Object.fromEntries(params.entries());

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        fetchTickets(query)
            .then((data) => mounted && setTickets(data))
            .finally(() => mounted && setLoading(false));

        return () => (mounted = false);
    }, [params.toString()]);

    if (loading) return <div style={{ padding: 20 }}>Loading tickets…</div>;

    return (
        <div
            style={{
                padding: 20,
                height: "calc(100vh - 100px)",
                overflowY: "auto"
            }}
        >
            {tickets.length === 0 && <div>No tickets match filters.</div>}

            {tickets.map((t) => (
                <div
                    key={t._id}
                    onClick={() => navigate(`/tickets/${t._id}`)}
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 12,
                        cursor: "pointer",
                        background: "#ffffff"
                    }}
                >
                    <div style={{ fontWeight: 600, fontSize: 15 }}>
                        {t.subject || "(No subject)"}
                    </div>

                    <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                        {t.customerEmail}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 8,
                            fontSize: 12,
                            color: "#111"
                        }}
                    >
                        <span>
                            Status: <strong>{t.status}</strong>
                        </span>

                        <span>
                            Agent:{" "}
                            <strong>
                                {t.assignedAgent?.email || "Unassigned"}
                            </strong>
                        </span>
                    </div>
                </div>

            ))}
        </div>
    );
}

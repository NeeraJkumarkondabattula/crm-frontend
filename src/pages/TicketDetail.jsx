import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import ReplyBox from "../components/ReplyBox";
import StatusDropdown from "../components/StatusDropdown";
import AssignAgent from "../components/AssignAgent";
import { useAuth } from "../context/AuthContext";




export default function TicketDetail() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { user } = useAuth();

    const handleAssigned = (agentId) => {
        setTicket(prev => ({
            ...prev,
            assignedAgent: agentId
        }));
    };

    useEffect(() => {
        let mounted = true;

        api
            .get(`/tickets/${id}`)
            .then((res) => {
                if (mounted) setTicket(res.data);
            })
            .catch(() => {
                if (mounted) setError("Failed to load ticket");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [id]);

    const handleSent = (msg) => {
        setTicket((prev) => ({
            ...prev,
            messages: [...prev.messages, msg]
        }));
    };
    const handleStatusChange = (nextStatus) => {
        setTicket((prev) => ({
            ...prev,
            status: nextStatus
        }));
    };


    if (loading) return <div style={{ padding: 20 }}>Loading ticket…</div>;
    if (error) return <div style={{ padding: 20 }}>{error}</div>;
    if (!ticket) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
                <div style={{ padding: 20, height: "100%", overflowY: "auto" }}>
                    <h2>{ticket.subject || "(No subject)"}</h2>

                    <div style={{ fontSize: 13, marginBottom: 6 }}>
                        Customer: <strong>{ticket.customerEmail}</strong>
                    </div>

                    <StatusDropdown
                        ticket={ticket}
                        onChange={handleStatusChange}
                    />

                    {user?.role === "admin" && (
                        <AssignAgent
                            ticketId={ticket._id}
                            onAssigned={handleAssigned}
                        />
                    )}

                    <div style={{ marginTop: 20 }}>

                        {ticket.messages?.length === 0 && (
                            <div>No messages yet.</div>
                        )}

                        {ticket.messages?.map((m, idx) => {
                            const incoming = m.direction === "incoming";
                            const html = m.bodyHtml || m.body;

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        display: "flex",
                                        justifyContent: incoming ? "flex-start" : "flex-end",
                                        marginBottom: 14
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: "70%",
                                            padding: 12,
                                            borderRadius: 8,
                                            background: incoming ? "#f1f5f9" : "#dcfce7",
                                            overflowWrap: "anywhere",
                                            wordBreak: "break-word"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "#555",
                                                marginBottom: 6
                                            }}
                                        >
                                            {incoming ? m.from : "You"}
                                        </div>

                                        {/* HTML OR TEXT */}
                                        {html ? (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeHtml(html)
                                                }}
                                                style={{
                                                    fontSize: 14,
                                                    lineHeight: 1.5
                                                }}
                                            />
                                        ) : (
                                            <pre
                                                style={{
                                                    margin: 0,
                                                    whiteSpace: "pre-wrap",
                                                    fontSize: 14
                                                }}
                                            >
                                                {m.bodyText}
                                            </pre>
                                        )}

                                        <div
                                            style={{
                                                fontSize: 11,
                                                color: "#888",
                                                marginTop: 8,
                                                textAlign: "right"
                                            }}
                                        >
                                            {new Date(m.date).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}


                    </div>
                </div>
            </div>
            <ReplyBox ticketId={ticket._id} onSent={handleSent} />
        </div >
    );
}

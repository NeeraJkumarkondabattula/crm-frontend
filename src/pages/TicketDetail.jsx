import { useEffect, useState } from "react";
import { fetchTicketById } from "../api/ticket.api";
import MessageBubble from "../components/MessageBubble";
import ReplyBox from "../components/ReplyBox";
import StatusDropdown from "../components/StatusDropdown";
import AssignAgent from "../components/AssignAgent";
import { useAuth } from "../context/AuthContext";



const TicketDetail = ({ ticketId }) => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        if (!ticketId) return;

        const loadTicket = async () => {
            setLoading(true);
            try {
                const res = await fetchTicketById(ticketId);
                setTicket(res.data);
            } finally {
                setLoading(false);
            }
        };

        loadTicket();
    }, [ticketId]);

    const handleAssigned = (agentId) => {
        setTicket((prev) => ({
            ...prev,
            assignedAgent: agentId,
            status: "escalated"
        }));
    };


    if (!ticketId) {
        return <div style={{ padding: 20 }}>Select a ticket</div>;
    }

    if (loading || !ticket) {
        return <div style={{ padding: 20 }}>Loading ticket…</div>;
    }

    const handleMessageSent = (message) => {
        setTicket((prev) => ({
            ...prev,
            messages: [...prev.messages, message]
        }));
    };

    const handleStatusChange = (newStatus) => {
        setTicket((prev) => ({
            ...prev,
            status: newStatus
        }));
    };



    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div
                style={{
                    padding: 16,
                    borderBottom: "1px solid #ddd",
                    background: "#fafafa",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div>
                    <h3 style={{ margin: 0 }}>{ticket.subject}</h3>
                    <div style={{ fontSize: 13 }}>
                        Customer: {ticket.customerEmail}
                    </div>
                    <div style={{ fontSize: 13 }}>
                        Assigned agent:{" "}
                        {ticket.assignedAgent?.email || "Unassigned"}
                    </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                    <StatusDropdown
                        ticket={ticket}
                        onStatusChange={handleStatusChange}
                    />

                    {user.role === "admin" && (
                        <AssignAgent
                            ticket={ticket}
                            onAssigned={handleAssigned}
                        />
                    )}
                </div>
            </div>



            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    padding: 16,
                    overflowY: "auto",
                    background: "#fff"
                }}
            >
                {ticket.messages.map((msg, idx) => (
                    <MessageBubble key={idx} message={msg} />
                ))}
            </div>

            {/* Reply box */}
            <ReplyBox ticket={ticket} onMessageSent={handleMessageSent} />
        </div>
    );

};

export default TicketDetail;

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

  const handleAssigned = (agentId, agentEmail) => {
    setTicket(prev => ({
      ...prev,
      assignedAgent: {
        _id: agentId,
        email: agentEmail
      }
    }));
  };

  useEffect(() => {
    let mounted = true;

    api.get(`/tickets/${id}`)
      .then(res => {
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
    setTicket(prev => ({
      ...prev,
      messages: [...prev.messages, msg]
    }));
  };

  const handleStatusChange = (nextStatus) => {
    setTicket(prev => ({
      ...prev,
      status: nextStatus
    }));
  };

  if (loading) return <div style={{ padding: 24 }}>Loading ticket…</div>;
  if (error) return <div style={{ padding: 24 }}>{error}</div>;
  if (!ticket) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f8fafc" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ background: "#ffffff", padding: 24, borderRadius: 12 }}>

          <h2 style={{ marginBottom: 8 }}>
            {ticket.subject || "(No subject)"}
          </h2>

          <div style={{ fontSize: 13, marginBottom: 4 }}>
            Customer: <strong>{ticket.customerEmail}</strong>
          </div>

          <div style={{ fontSize: 13, marginBottom: 12 }}>
            Assigned Agent:{" "}
            <strong>{ticket.assignedAgent?.email || "Not assigned"}</strong>
          </div>

          <StatusDropdown
            ticket={ticket}
            onChange={handleStatusChange}
          />

          {user?.role === "admin" && (
            <AssignAgent
              ticketId={ticket._id}
              onAssigned={(id, email) => handleAssigned(id, email)}
            />
          )}

          {/* 🤖 AI INFO */}
          {ticket.ai && (
            <div
              style={{
                marginTop: 20,
                padding: 16,
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                background: "#fafafa",
                fontSize: 13
              }}
            >
              <div><strong>Issue Tag:</strong> {ticket.ai.issueTag}</div>
              <div style={{ marginTop: 6 }}>
                <strong>Summary:</strong> {ticket.ai.summary}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>Order ID:</strong> {ticket.ai.extracted?.orderId || "—"}
              </div>
              <div>
                <strong>Phone:</strong> {ticket.ai.extracted?.phone || "—"}
              </div>
              <div>
                <strong>Confidence:</strong>{" "}
                {Number.isFinite(ticket.ai.confidence)
                  ? `${Math.round(ticket.ai.confidence * 100)}%`
                  : "—"}
              </div>
            </div>
          )}

          {/* 💬 MESSAGE THREAD */}
          <div style={{ marginTop: 24 }}>
            {ticket.messages?.length === 0 && <div>No messages yet.</div>}

            {ticket.messages?.map((m, idx) => {
              const incoming = m.direction === "incoming";

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
                      borderRadius: 10,
                      background: incoming ? "#f3f4f6" : "#111827",
                      color: incoming ? "#111" : "#ffffff"
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        opacity: 0.8,
                        marginBottom: 6
                      }}
                    >
                      {incoming ? m.from : "You"}
                    </div>

                    {/* ✅ CORRECT MESSAGE RENDERING */}
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        fontSize: 14,
                        lineHeight: 1.5,
                        fontFamily: "inherit"
                      }}
                    >
                      {m.bodyText}
                    </pre>

                    <div
                      style={{
                        fontSize: 11,
                        opacity: 0.6,
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
    </div>
  );
}

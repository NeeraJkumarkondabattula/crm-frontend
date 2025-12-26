import { useState } from "react";
import { replyToTicket } from "../api/email.api";

export default function ReplyBox({ ticketId, onSent }) {
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const send = async () => {
        if (!text.trim() || sending) return;

        setSending(true);
        setError("");

        try {
            const message = await replyToTicket({
                ticketId,
                bodyText: text
            });

            onSent({
                direction: "outgoing",
                bodyText: text,
                date: new Date().toISOString(),
                from: "You"
            });

            setText("");
        } catch {
            setError("Failed to send reply");
        } finally {
            setSending(false);
        }
    };

    return (
        <div
            style={{
                borderTop: "1px solid #e5e7eb",
                padding: 12,
                display: "flex",
                gap: 8
            }}
        >
            <textarea
                placeholder="Type your reply…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                style={{
                    flex: 1,
                    resize: "none",
                    padding: 8
                }}
            />

            <button onClick={send} disabled={sending}>
                {sending ? "Sending…" : "Send"}
            </button>

            {error && (
                <div style={{ color: "red", fontSize: 12 }}>{error}</div>
            )}
        </div>
    );
}

import { useState } from "react";
import { replyToTicket } from "../api/email.api";

const ReplyBox = ({ ticket, onMessageSent }) => {
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        console.log("🔥 Send clicked"); // DEBUG (must appear)

        if (!text.trim()) return;

        setSending(true);

        try {
            console.log("📤 Sending request");


            const res = await replyToTicket({
                ticketId: ticket._id,   // ✅ Mongo ObjectId
                bodyText: text
            });


            console.log("✅ Sent", res.data);

            onMessageSent({
                direction: "outgoing",
                bodyText: text,
                from: "You",
                to: ticket.customerEmail,
                date: new Date().toISOString()
            });

            setText("");
        } catch (err) {
            console.error("❌ Send failed", err);
        } finally {
            setSending(false);
        }
    };

    return (
        <div
            style={{
                borderTop: "1px solid #ddd",
                padding: 10,
                display: "flex",
                gap: 8
            }}
        >
            <textarea
                rows={2}
                placeholder="Type a reply…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ flex: 1 }}
            />

            <button
                type="button"     // 🔴 REQUIRED
                onClick={handleSend}
                disabled={sending}
            >
                {sending ? "Sending…" : "Send"}
            </button>
        </div>
    );
};

export default ReplyBox;

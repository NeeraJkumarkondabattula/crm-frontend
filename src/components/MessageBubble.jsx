const MessageBubble = ({ message }) => {
    const isIncoming = message.direction === "incoming";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isIncoming ? "flex-start" : "flex-end",
                marginBottom: 10
            }}
        >
            <div
                style={{
                    maxWidth: "70%",
                    padding: 10,
                    borderRadius: 8,
                    background: isIncoming ? "#f1f1f1" : "#dcf8c6"
                }}
            >
                <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
                    {isIncoming ? message.from : "You"}
                </div>

                <div style={{ whiteSpace: "pre-wrap" }}>
                    {message.bodyText || message.body || message.text || ""}
                </div>

                <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
                    {new Date(message.date).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;

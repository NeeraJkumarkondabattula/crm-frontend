import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TicketList from "../components/TicketList";
import TicketDetail from "./TicketDetail";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Left: ticket list */}
            <TicketList
                selectedTicketId={selectedTicketId}
                onSelect={setSelectedTicketId}
            />

            {/* Right: ticket detail */}
            <div style={{ flex: 1 }}>
                <TicketDetail ticketId={selectedTicketId} />
            </div>

            {/* Top-right logout (temporary) */}
            <button
                onClick={logout}
                style={{ position: "absolute", top: 10, right: 10 }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;

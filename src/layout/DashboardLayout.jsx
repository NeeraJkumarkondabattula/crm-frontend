import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";
import { fetchTickets } from "../api/ticket.api";
import usePolling from "../hooks/usePolling";

export default function DashboardLayout() {
    const [stats, setStats] = useState({
        all: 0,
        open: 0,
        ongoing: 0,
        pending: 0,
        resolved: 0,
        escalated: 0
    });

    const loadStats = async () => {
        const tickets = await fetchTickets();
        const s = {
            all: tickets.length,
            open: 0,
            ongoing: 0,
            pending: 0,
            resolved: 0,
            escalated: 0
        };

        tickets.forEach(t => {
            if (s[t.status] !== undefined) s[t.status]++;
        });

        setStats(s);
    };

    useEffect(() => {
        loadStats();
    }, []);

    usePolling(loadStats, 6000, []);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar stats={stats} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <TopNavBar stats={stats} />
                <div style={{ flex: 1, overflow: "hidden" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

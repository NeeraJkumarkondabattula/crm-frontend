import { NavLink } from "react-router-dom";

export default function Sidebar({ stats }) {
    const Item = ({ to, label, count }) => (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 10px",
                marginBottom: 6,
                borderRadius: 6,
                color: "white",
                textDecoration: "none",
                background: isActive ? "#1e293b" : "transparent"
            })}
        >
            <span>{label}</span>
            <span style={{ fontSize: 12 }}>{count}</span>
        </NavLink>
    );

    return (
        <div style={{ width: 220, background: "#020617", color: "white", padding: 16 }}>
            <h3>Support CRM</h3>

            <Item to="/tickets" label="All" count={stats.all} />
            <Item to="/tickets?status=open" label="Open" count={stats.open} />
            <Item to="/tickets?status=ongoing" label="Ongoing" count={stats.ongoing} />
            <Item to="/tickets?status=pending" label="Pending" count={stats.pending} />
            <Item to="/tickets?status=resolved" label="Resolved" count={stats.resolved} />
            <Item to="/tickets?status=escalated" label="Escalated" count={stats.escalated} />
        </div>
    );
}

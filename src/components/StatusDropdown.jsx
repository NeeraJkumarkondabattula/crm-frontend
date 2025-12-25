import { useState } from "react";
import { updateTicketStatus } from "../api/ticket.api";

const STATUSES = ["open", "ongoing", "pending", "resolved", "escalated"];

const StatusDropdown = ({ ticket, onStatusChange }) => {
    const [status, setStatus] = useState(ticket.status);
    const [saving, setSaving] = useState(false);

    const handleChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setSaving(true);

        try {
            await updateTicketStatus(ticket._id, newStatus);
            onStatusChange(newStatus);
        } finally {
            setSaving(false);
        }
    };

    return (
        <select value={status} onChange={handleChange} disabled={saving}>
            {STATUSES.map((s) => (
                <option key={s} value={s}>
                    {s}
                </option>
            ))}
        </select>
    );
};

export default StatusDropdown;

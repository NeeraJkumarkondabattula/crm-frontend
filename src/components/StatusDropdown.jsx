import { useState } from "react";
import { updateTicketStatus } from "../api/ticket.api";

const STATUSES = ["open", "ongoing", "pending", "resolved", "escalated"];

export default function StatusDropdown({ ticket, onChange }) {
    const [status, setStatus] = useState(ticket.status);
    const [saving, setSaving] = useState(false);

    const handleChange = async (e) => {
        const next = e.target.value;
        setStatus(next);
        setSaving(true);

        try {
            await updateTicketStatus(ticket._id, next);
            onChange(next);
        } catch {
            setStatus(ticket.status); // rollback
            alert("Failed to update status");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 13, marginRight: 8 }}>
                Status:
            </label>

            <select
                value={status}
                onChange={handleChange}
                disabled={saving}
            >
                {STATUSES.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>

            {saving && (
                <span style={{ fontSize: 12, marginLeft: 8 }}>
                    Updating…
                </span>
            )}
        </div>
    );
}

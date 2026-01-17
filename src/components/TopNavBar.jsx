import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TopNavBar({ stats }) {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { user, logout } = useAuth();

    const setParam = (key, value) => {
        const p = new URLSearchParams(params);
        if (!value) p.delete(key);
        else p.set(key, value);
        navigate(`/tickets?${p.toString()}`);
    };

    return (
        <div
            style={{
                height: 64,
                borderBottom: "1px solid #e5e7eb",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
                background: "white"
            }}
        >
            {/* SEARCH + FILTERS */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                    placeholder="Search subject or email"
                    defaultValue={params.get("q") || ""}
                    onChange={(e) => setParam("q", e.target.value)}
                    style={{ padding: 8, width: 220 }}
                />

                <select
                    defaultValue={params.get("status") || ""}
                    onChange={(e) => setParam("status", e.target.value)}
                >
                    <option value="">All statuses</option>
                    <option value="open">Open</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="escalated">Escalated</option>
                </select>

                <select
                    value={params.get("issueTag") || ""}
                    onChange={e => setParam("issueTag", e.target.value)}
                >
                    <option value="">All Issues</option>

                    {/* 🛒 Order & Delivery */}
                    <option value="order-status">Order Status</option>
                    <option value="order-not-received">Order Not Received</option>
                    <option value="delay-dispatch">Delay in Dispatch</option>
                    <option value="delivery-delay">Delivery Delay</option>
                    <option value="tracking-link">Tracking Link</option>
                    <option value="rto">RTO (Return to Origin)</option>
                    <option value="address-modification">Address Modification</option>

                    {/* 💳 Payment & Checkout */}
                    <option value="payment-failed">Payment Failed</option>
                    <option value="shopify-cod-issue">Shopify COD Issue</option>
                    <option value="refund-request">Refund Request</option>
                    <option value="order-cancellation">Order Cancellation</option>

                    {/* 📦 Returns & Post Delivery */}
                    <option value="return-request">Return Request</option>
                    <option value="wrong-product">Wrong Product</option>
                    <option value="post-delivery-missing">Missing Product</option>
                    <option value="post-delivery-damaged">Damaged Product</option>

                    {/* 🧴 Product & Health */}
                    <option value="skin-issues">Skin Issues</option>
                    <option value="fake-product">Fake Product</option>

                    {/* 🚨 Trust & Fraud */}
                    <option value="fake-sellers">Fake Sellers</option>

                    {/* 👤 Account */}
                    <option value="account-issue">Account Issue</option>

                    {/* 💬 Generic */}
                    <option value="general-query">General Query</option>
                </select>



                <input
                    type="date"
                    defaultValue={params.get("from") || ""}
                    onChange={(e) => setParam("from", e.target.value)}
                />
                <input
                    type="date"
                    defaultValue={params.get("to") || ""}
                    onChange={(e) => setParam("to", e.target.value)}
                />
            </div>

            {/* RIGHT */}
            <button onClick={() => navigate("/profile")}>
                Profile
            </button>
        </div>
    );
}

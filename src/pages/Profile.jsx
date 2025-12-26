import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div style={{ padding: 24 }}>
            <h2>My Profile</h2>

            <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8 }}>
                    <strong>Email:</strong> {user.email}
                </div>

                <div style={{ marginBottom: 8 }}>
                    <strong>Role:</strong> {user.role}
                </div>

                <div style={{ marginTop: 20 }}>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

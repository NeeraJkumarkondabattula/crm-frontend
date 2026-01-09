import styled from "styled-components";

const COLORS = {
  open: "#ef4444",
  ongoing: "#3b82f6",
  pending: "#f59e0b",
  resolved: "#16a34a"
};

const Badge = styled.span`
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 12px;
  color: white;
  background: ${({ status }) => COLORS[status] || "#6b7280"};
  text-transform: capitalize;
`;

const StatusBadge = ({ status }) => {
  return <Badge status={status}>{status}</Badge>;
};

export default StatusBadge;

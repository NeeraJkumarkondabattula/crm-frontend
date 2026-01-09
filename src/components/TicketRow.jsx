import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const Row = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  background: ${({ unread }) => (unread ? "#eef2ff" : "#ffffff")};

  &:hover {
    background: #f1f5f9;
  }
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Subject = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const TicketRow = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <Row
      unread={ticket.unreadCount > 0}
      onClick={() => navigate(`/tickets/${ticket._id}`)}

    >
      <Avatar>
        {ticket.customerEmail?.[0]?.toUpperCase()}
      </Avatar>

      <Content>
        <Subject>{ticket.subject}</Subject>
        <Meta>{ticket.customerEmail}</Meta>
      </Content>

      <StatusBadge status={ticket.status} />
    </Row>
  );
};

export default TicketRow;

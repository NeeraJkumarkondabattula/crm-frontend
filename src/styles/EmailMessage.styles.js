import styled from "styled-components";

export const EmailWrapper = styled.div`
  background: ${({ direction }) =>
    direction === "outgoing" ? "#f0f7ff" : "#ffffff"};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 14px;
  max-width: 900px;
`;

export const EmailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: #374151;
`;

export const Sender = styled.div`
  font-weight: 600;
`;

export const DateText = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const EmailBody = styled.div`
  white-space: pre-wrap;   /* 🔥 CRITICAL FIX */
  line-height: 1.6;
  font-size: 14px;
  color: #111827;
`;

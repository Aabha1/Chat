import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #4e0eff;
  }
`;

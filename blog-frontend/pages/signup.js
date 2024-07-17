import { useState } from "react";
import { useRouter } from "next/router";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  paddingTop: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  width: "100%",
};

const inputStyle = {
  marginBottom: "10px",
  padding: "8px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const messageStyle = {
  color: "green",
  marginBottom: "10px",
};

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      setMessage("Signup successful. Redirecting to login page...");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after 2 seconds
    } else {
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Signup</h1>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          placeholder="Password"
        />
        <button type="submit" style={buttonStyle}>
          Signup
        </button>
      </form>
    </div>
  );
}

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      console.log("Token:", token);
      // Store the token in localStorage
      localStorage.setItem("token", token);
      console.log("Login successful");
      router.push("/posts");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
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
          Login
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";

interface ApiResponse {
  status: "success" | "error";
  message: string;
}

const ContactTest: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email";
    if (!message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("http://lalani.ir/api/contract.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data: ApiResponse = await res.json();
      setResponse(data);

      if (data.status === "success") {
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Form</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Namee"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          disabled={loading}
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
          disabled={loading}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {response && (
        <div
          style={{
            ...styles.response,
            color: response.status === "success" ? "green" : "red",
          }}
        >
          {response.message}
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default ContactTest;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontFamily: "sans-serif",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "14px",
  },
  textarea: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "14px",
    minHeight: "100px",
  },
  button: {
    padding: "10px",
    fontSize: "15px",
    cursor: "pointer",
  },
  response: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    marginTop: "15px",
    textAlign: "center",
    color: "red",
  },
};

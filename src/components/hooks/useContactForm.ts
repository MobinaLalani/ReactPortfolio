import { useState } from "react";

interface ApiResponse {
  status: "success" | "error";
  message: string;
}

export const useContactForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!fullname.trim()) return "Full name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email";
    if (!message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

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
          fullname,
          email,
          message,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data: ApiResponse = await res.json();
      setResponse(data);

      if (data.status === "success") {
        setFullname("");
        setEmail("");
        setMessage("");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    fullname,
    email,
    message,

    loading,
    response,
    error,

    setFullname,
    setEmail,
    setMessage,

    handleSubmit,
  };
};

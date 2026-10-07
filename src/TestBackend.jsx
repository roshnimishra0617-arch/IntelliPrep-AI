import { useEffect, useState } from "react";

function TestBackend() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    fetch("http://localhost:5000/test-db")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Backend connection failed");
      });
  }, []);

  return (
    <div>
      <h2>PrepVeyra Database Test</h2>
      <p>{message}</p>
    </div>
  );
}

export default TestBackend;
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert, Image } from "react-bootstrap";
import { useUser, useAuth } from "../context/AuthProvider";
import atmPng from "./public/ATM-withdraw.png"; // Ensure the path is correct

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [showImage, setShowImage] = useState(false);
  const user = useUser();
  const { withdrawMoney } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validate = () => {
      if (selectedAccount === "") {
        setError("Please select an account");
        return false;
      }
      const accountBalance = user.accounts.find(
        (acc) => acc.accountNumber === selectedAccount
      ).balance;
      if (amount > accountBalance) {
        setError("Error: can’t withdraw more than account balance");
        return false;
      }
      setError("");
      return amount > 0;
    };

    console.log("Amount:", amount, "Selected account:", selectedAccount);
    console.log("validate:" , );
    setIsFormValid(validate());
  }, [amount, selectedAccount, user]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid && user) {
      setIsLoading(true);
      const { success, message } = await withdrawMoney(amount, selectedAccount);
      setIsLoading(false);
      setStatus(message);
      if (success) {
        setAmount("");
        setSelectedAccount("");
        setShowImage(true);
        setTimeout(() => {
          setShowImage(false);
          setStatus("");
        }, 3000);
      } else {
        setTimeout(() => setStatus(""), 3000);
      }
    }
  };

  return (
    <Card bg="danger" text="white" style={{ width: "18rem" }} className="mb-2">
      <Card.Header>Withdraw</Card.Header>
      <Card.Body>
        {user ? (
          <>
            <p>Hello, {user.name}</p>
            <p>
              Balance: $
              {selectedAccount
                ? user.accounts.find(
                    (acc) => acc.accountNumber === selectedAccount
                  ).balance
                : "Select an account"}
            </p>
            <Form.Group controlId="account">
              <Form.Label>Account</Form.Label>
              <Form.Control
                as="select"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
              >
                <option value="" disabled>
                  Select account
                </option>
                {user.accounts.map((account, idx) => (
                  <option key={idx} value={account.accountNumber}>
                    {account.accountNumber}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </>
        ) : (
          <p>Please login</p>
        )}
        {status && (
          <Alert variant="success" onClose={() => setStatus("")} dismissible>
            <p>{status}</p>
          </Alert>
        )}
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            <p>{error}</p>
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.abs(Number(e.target.value)))}
              placeholder="Amount"
              required
            />
          </Form.Group>
          <Button
            block
            size="lg"
            type="submit"
            disabled={!isFormValid || isLoading || showImage}
            style={{
              cursor:
                !isFormValid || isLoading || showImage
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {isLoading ? "Processing..." : "Withdraw"}
          </Button>
        </Form>
        {status && <Alert variant="info">{status}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        {showImage && <Image src={atmPng} alt="ATM image" />}
      </Card.Body>
    </Card>
  );
}

export default Withdraw;

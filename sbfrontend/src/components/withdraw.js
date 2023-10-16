import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import styles from "./styles.css";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "danger", "info"
  const [showImage, setShowImage] = useState(false);
  const { user, withdrawMoney } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validate = () => {
      if (selectedAccount === "") {
        setMessage("Please select an account");
        setMessageType("danger");
        return false;
      }
      const accountBalance = user.accounts.find(
        (acc) => acc.accountNumber === selectedAccount
      ).balance;
      if (amount > accountBalance) {
        setMessage("Error: can’t withdraw more than account balance");
        setMessageType("danger");
        return false;
      }
      setMessage("");
      return amount > 0;
    };

    console.log("Amount:", amount, "Selected account:", selectedAccount);
    console.log("validate:");
    setIsFormValid(validate());
  }, [amount, selectedAccount, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid && user) {
      setIsLoading(true);
      const { success, message } = await withdrawMoney(amount, selectedAccount);
      setIsLoading(false);
      setMessage(message);
      if (success) {
        setMessageType("success");
        setAmount("");
        setSelectedAccount("");
        setShowImage(true);
        setTimeout(() => {
          setShowImage(false);
          setMessage("");
        }, 3000);
      } else {
        setMessageType("info");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  return (
    <Card bg="danger" text="white" style={{ width: "18rem", position: 'relative' }} className="mb-2">
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
        {message && (
        <Alert variant={messageType} onClose={() => setMessage("")} dismissible>
          <p>{message}</p>
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
        {showImage && (
          <div className="withdraw-image-overlay">
            <Image src="/ATM-withdraw.png" alt="ATM image" />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Withdraw;

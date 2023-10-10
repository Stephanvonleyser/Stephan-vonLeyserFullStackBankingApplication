import React, { useEffect, useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useUser, useAuth } from "../context/AuthProvider";
import { Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

function Transfer() {
  const [originAmount, setOriginAmount] = useState("");
  const [originAccount, setOriginAccount] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const user = useUser();
  const { transferMoney } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (originAccount === "") {
      setError("Please select an origin account");
      return false;
    }
    const accountBalance = user.accounts.find(
      (acc) => acc.accountNumber === originAccount
    ).balance;
    if (originAmount > accountBalance) {
      setError("Error: can’t transfer more than account balance");
      return false;
    }
    if (!destinationEmail || !destinationAccount) {
      setError("Destination email and account number are required");
      return false;
    }
    if (!emailRegex.test(destinationEmail)) {
        setError("Invalid email format");
        return false;
    }
    setError("");
    return (
      originAmount > 0 &&
      originAccount !== "" &&
      destinationEmail !== "" &&
      destinationAccount !== ""
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm() && user) {
      setShowModal(true);
      // Initialize countdown
      setCountdown(5);
      // Start countdown
      const intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(intervalId); // Clear interval at 0
            setConfirmDisabled(false); // Enable button at 0
            return prev - 1;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
  };

  const handleTransfer = async () => {
    setIsLoading(true);
    const { success, message } = await transferMoney(
      originAmount,
      originAccount,
      destinationEmail,
      destinationAccount
    );
    setIsLoading(false);
    if (success) {
      setStatus("Transfer successful!");
      // Reset form
      setOriginAmount("");
      setOriginAccount("");
      setDestinationEmail("");
      setDestinationAccount("");
    } else {
      setError(message || "Transfer failed!");
    }
    setShowModal(false);
    setConfirmDisabled(true);
  };

  useEffect(() => {
    let intervalId;

    if (showModal) {
      setCountdown(5);
      intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(intervalId); // Clear interval at 0
            setConfirmDisabled(false); // Enable button at 0
            return prev - 1;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    // Cleanup: Clear interval when the component is unmounted or modal is hidden
    return () => {
      clearInterval(intervalId);
    };
  }, [showModal]);

  return (
    <Row className="mb-4">
      <Col>
        {/* Origin Card */}
        <Card bg="primary" text="white" style={{ width: "18rem" }}>
          <Card.Header>Origin</Card.Header>
          <Card.Body>
            {user ? (
              <>
                <p>Hello, {user.name}</p>
                {user.accounts && user.accounts.length > 0 ? (
                  <>
                    <p>
                      Balance: $
                      {originAccount
                        ? user.accounts.find(
                            (acc) => acc.accountNumber === originAccount
                          ).balance
                        : "Select an account"}
                    </p>
                    <Form.Group controlId="account">
                      <Form.Label>Account</Form.Label>
                      <Form.Control
                        as="select"
                        value={originAccount}
                        onChange={(e) => setOriginAccount(e.target.value)}
                      >
                        <option value="" disabled>
                          Select account
                        </option>
                        {user.accounts.map((account) => (
                          <option
                            key={account.accountNumber}
                            value={account.accountNumber}
                          >
                            {account.accountNumber}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </>
                ) : (
                  <p>No accounts available.</p>
                )}
              </>
            ) : (
              <p>Please login</p>
            )}
            <Form.Group size="lg" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={originAmount}
                onChange={(e) =>
                  setOriginAmount(Math.abs(Number(e.target.value)))
                }
                placeholder="Amount"
                required
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        {/* Destination Card */}
        <Card bg="danger" text="white" style={{ width: "18rem" }}>
          <Card.Header>Destination</Card.Header>
          <Card.Body>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={destinationEmail}
                onChange={(e) => setDestinationEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </Form.Group>
            <Form.Group controlId="account">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                value={destinationAccount}
                onChange={(e) => setDestinationAccount(e.target.value)}
                placeholder="1234567890"
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} className="mt-3">
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
        <Button
          block
          size="lg"
          type="button"
          onClick={handleSubmit}
          disabled={!validateForm()}
        >
          Transfer
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Transfer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Origin Account: {originAccount}</p>
            <p>
              Balance: $
              {originAccount
                ? user.accounts.find(
                    (acc) => acc.accountNumber === originAccount
                  ).balance
                : "Select an account"}
            </p>
            <p>Destination Email: {destinationEmail}</p>
            <p>Destination Account: {destinationAccount}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={confirmDisabled || isLoading}
              onClick={handleTransfer}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `Confirm Transfer ${confirmDisabled ? `(${countdown})` : ""}`
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
}

export default Transfer;

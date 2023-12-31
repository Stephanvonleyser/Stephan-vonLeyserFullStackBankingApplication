import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, Alert, ListGroup } from "react-bootstrap";
import clientAxios from "../server/clientAxios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [status, setStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const mounted = useRef(true);

  function validatePassword(password) {
    const hasLowerCase = /[a-z]/g.test(password);
    const hasUpperCase = /[A-Z]/g.test(password);
    const hasDigit = /[0-9]/g.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/g.test(password);
    const isLengthValid = password.length >= 8;

    return {
      isLengthValid,
      hasLowerCase,
      hasUpperCase,
      hasDigitOrSymbol: hasDigit || hasSymbol,
      isValid:
        isLengthValid &&
        hasLowerCase &&
        hasUpperCase &&
        (hasDigit || hasSymbol),
    };
  }

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []); // Empty dependency array means this useEffect runs once on mount and once on unmount

  async function handleCreate(e) {
    e.preventDefault();

    // Validation checks
    if (!userName || !email || !password || !confirmPassword) {
      setStatus("All fields are required.");
      return;
    }

    if (!validatePassword(password)) {
      setStatus(
        "Password needs to be at least 8 characters long and use UPPERCASE, lowercase and a number 0-9 or symbol ."
      );
      return;
    }

    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    // Send a request to create the account
    try {
      const response = await clientAxios.post("/user/createuser", {
        userName,
        email,
        password,
        role,
      });

      if (response.data.success) {
        // If the account was created successfully...
        setStatus("Account created successfully!");
        setTimeout(() => {
          if (mounted.current) {
            navigate("/login");
          }
        }, 1500);
        // Additional logic (e.g., redirecting) can be added here.
      } else {
        setStatus(
          response.data.message ||
            "An error occurred while creating the account."
        );
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
      console.error("An error occurred while sending the request: ", error);
    } finally {
      if (mounted.current) {
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  }

  const passwordValidation = validatePassword(password);

  return (
    <Card bg="primary" text="white" style={{ width: "18rem" }} className="mb-2">
      <Card.Header>Create Account</Card.Header>
      <Card.Body>
        {status && (
          <Alert
            variant={
              status === "Account created successfully!" ? "success" : "danger"
            }
            onClose={() => setStatus("")}
            dismissible
          >
            <p>{status}</p>
          </Alert>
        )}
        <Form onSubmit={handleCreate}>
          <Form.Group controlId="userName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="9">Admin</option>
                <option value="1">Client</option>
              </Form.Control>
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isValid={password && validatePassword(password)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isValid={confirmPassword && password === confirmPassword}
            />
          </Form.Group>
          <ListGroup variant="flush">
            <ListGroup.Item
              variant={passwordValidation.isLengthValid ? "success" : "danger"}
            >
              Password is at least 8 characters
            </ListGroup.Item>
            <ListGroup.Item
              variant={passwordValidation.hasLowerCase ? "success" : "danger"}
            >
              Contains lowercase letter
            </ListGroup.Item>
            <ListGroup.Item
              variant={passwordValidation.hasUpperCase ? "success" : "danger"}
            >
              Contains UPPERCASE letter
            </ListGroup.Item>
            <ListGroup.Item
              variant={
                passwordValidation.hasDigitOrSymbol ? "success" : "danger"
              }
            >
              Contains a number (0-9) or symbol
            </ListGroup.Item>
            <ListGroup.Item
              variant={password === confirmPassword ? "success" : "danger"}
            >
              Passwords match
            </ListGroup.Item>
          </ListGroup>
          <Button variant="light" type="submit" className="mt-3">
            Create Account
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateUser;

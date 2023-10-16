import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthProvider";
import { Card as BootstrapCard, Alert, ListGroup } from "react-bootstrap";
import clientAxios from "../server/clientAxios";
import { getConfig } from "../server/config";

function AllData() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const config = getConfig(token);
            if(user && user.role === 9) {
                const { data } = await clientAxios.get('/user/admin/alldata', config);
                setUsers(data.users);
            } else {
                setError('You do not have access to this data.');
            }
        } catch (error) {
            setError('Error fetching data: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };
    fetchAllUsers();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h5>All Data in Store</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      {users.map((user, index) => (
        <BootstrapCard
          key={index}
          bg="light"
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <BootstrapCard.Header>{user.name}</BootstrapCard.Header>
          <BootstrapCard.Body>
            <BootstrapCard.Text>Name: {user.name}</BootstrapCard.Text>
            <BootstrapCard.Text>Email: {user.email}</BootstrapCard.Text>
            <BootstrapCard.Text>Role: {user.role}</BootstrapCard.Text>
            <ListGroup variant="flush">
              {user.accounts && user.accounts.length > 0 ? (
                user.accounts.map((account) => (
                  <ListGroup.Item key={account.accountNumber}>
                    <strong>Account:</strong> {account.accountNumber} <br />
                    <strong>Balance:</strong> ${account.balance.toFixed(2)}
                  </ListGroup.Item>
                ))
              ) : (
                <p>No accounts available.</p>
              )}
            </ListGroup>
          </BootstrapCard.Body>
        </BootstrapCard>
      ))}
    </>
  );
}

export default AllData;
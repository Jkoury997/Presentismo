"use client"
import { useEffect, useState } from "react";
import UserList from "@/components/component/user-list";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/user/list");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <UserList users={users} />;
}
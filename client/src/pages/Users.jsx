import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDriveContext } from "../context/driveContext";
import fetchData from "../utils/apiCall";
import Loading from "../components/Loading";
import CustomDataGrid from "./CustomDataGrid";
import { Box } from "@mui/material";

const Users = () => {
  const { isLoading, setLoading } = useDriveContext();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );

  const fetchUsers = async (url) => {
    try {
      setLoading(true);
      const data = await fetchData(url);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(`/user/get-users/${user._id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.fullName}`,
        id: "studentName",
        header: "Student Name",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.pic}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "registrationNumber",
        header: "Registration Number",
        size: 80,
      },
      {
        accessorKey: "email",
        header: "Email Address",
        size: 80,
      },
      {
        accessorKey: "phoneNo",
        header: "Phone Number",
        size: 100,
      },
      {
        accessorFn: (row) => `${row.coordinator}`,
        id: "coordinator",
        filterFn: "between",
        header: "Coordinator",
        size: 50,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={() => ({
              borderRadius: "10px",
              backgroundColor: `${
                cell.getValue() === "false" ? "#F0F1FA" : "#E1FCEF"
              }`,
              color: `${cell.getValue() === "false" ? "#4F5AED" : "#14804A"}`,
              display: "flex",
              justifyContent: "center",
              maxWidth: "6ch",
            })}
          >
            {cell.getValue()}
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Navbar />
      {isLoading && <Loading />}
      {!isLoading && (
        <CustomDataGrid
          columns={columns}
          data={users}
          drive={false}
          applicants={false}
          applications={false}
          users={true}
          setData={setUsers}
          admin={user.incharge}
          url={`/user/get-users/${user._id}`}
        />
      )}
      <Footer />
    </>
  );
};

export default Users;

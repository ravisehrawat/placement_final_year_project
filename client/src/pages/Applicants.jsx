import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDriveContext } from "../context/driveContext";
import fetchData from "../utils/apiCall";
import Loading from "../components/Loading";
import CustomDataGrid from "./CustomDataGrid";
import { Box } from "@mui/material";

const Applicants = () => {
  const { isLoading, setLoading } = useDriveContext();
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );

  const fetchApplications = async (url) => {
    try {
      setLoading(true);
      const data = await fetchData(url);
      setApplications(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications(`/application/get-applications/${user._id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.userId.fullName}`,
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
              src={row.original.userId.pic}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.driveId.jobTitle}`,
        id: "jobTitle",
        header: "Job Title",
        size: 180,
      },
      {
        accessorFn: (row) => `${row.driveId.companyName}`,
        id: "company",
        header: "Company Name",
        size: 50,
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
              src={row.original.driveId.pic}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.status}`,
        id: "status",
        filterFn: "between",
        header: "Status",
        size: 50,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={() => ({
              borderRadius: "10px",
              backgroundColor: `${
                cell.getValue() === "Pending"
                  ? "#F0F1FA"
                  : cell.getValue() === "Selected"
                  ? "#E1FCEF"
                  : "#FAF0F3"
              }`,
              color: `${
                cell.getValue() === "Pending"
                  ? "#4F5AED"
                  : cell.getValue() === "Selected"
                  ? "#14804A"
                  : "#D12953"
              }`,
              display: "flex",
              justifyContent: "center",
              maxWidth: "9ch",
              p: "0.25rem 0.5rem",
            })}
          >
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.round}`,
        id: "currentRound",
        filterFn: "between",
        header: "Current Round",
        size: 20,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.driveId.totalRounds}`,
        id: "totalRound",
        filterFn: "between",
        header: "Total Rounds",
        size: 20,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={{ display: "flex", justifyContent: "center" }}
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
          data={applications}
          drive={false}
          applicants={true}
          applications={false}
          users={false}
          setData={setApplications}
          admin={user.incharge || user.coordinator}
          url={`/application/get-applications/${user._id}`}
        />
      )}
      <Footer />
    </>
  );
};

export default Applicants;

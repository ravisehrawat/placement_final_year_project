import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDriveContext } from "../context/driveContext";
import Loading from "../components/Loading";
import fetchData from "../utils/apiCall";
import CustomDataGrid from "./CustomDataGrid";
import { Box } from "@mui/material";

const Applications = () => {
  const { isLoading, setLoading } = useDriveContext();
  const [applications, setApplications] = useState([]);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userDetails"))._id
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
    fetchApplications(`/application/get-application/${userId}`);
  }, []);

  const columns = useMemo(
    () => [
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
            sx={(theme) => ({
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
        size: 30,
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
        size: 30,
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
        accessorFn: (row) => `${row.createdAt.split("T")[0]}`,
        id: "appliedOn",
        header: "Applied On",
        size: 100,
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
          applicants={false}
          applications={true}
          users={false}
          admin={JSON.parse(localStorage.getItem("userDetails")).isAdmin}
        />
      )}
      <Footer />
    </>
  );
};

export default Applications;

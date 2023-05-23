import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import jwtDecode from "jwt-decode";
import { useDriveContext } from "../context/driveContext";
import Loading from "../components/Loading";
import { Box } from "@mui/material";
import CustomDataGrid from "./CustomDataGrid";
import PriceFormat from "../components/PriceFormat";

const Drives = () => {
  const { drives, isLoading, fetchDrives } = useDriveContext();
  const [userId, setUserId] = useState(
    jwtDecode(localStorage.getItem("token")).userDetails._id
  );

  useEffect(() => {
    fetchDrives(`/drive/get-drives/${userId}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "jobTitle",
        header: "Job Title",
        size: 180,
      },
      {
        accessorFn: (row) => `${row.companyName}`,
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
              src={row.original.pic}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },

      {
        accessorKey: "salary",
        filterFn: "between",
        header: "Salary",
        size: 50,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={() => ({
              borderRadius: "10px",
              backgroundColor: "#E1FCEF",
              color: "#14804A",
              maxWidth: "9ch",
              p: "0.25rem 0.5rem",
            })}
          >
            <PriceFormat price={cell.getValue()} />
          </Box>
        ),
      },
      {
        accessorKey: "jobType",
        header: "Job Type",
        size: 100,
      },
      {
        accessorKey: "minCGPA",
        header: "Minimum CGPA",
        size: 50,
      },
      {
        accessorKey: "lastDate",
        header: "Last Date",
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
          data={drives}
          drive={true}
          applicants={false}
          applications={false}
          users={false}
          admin={JSON.parse(localStorage.getItem("userDetails")).isAdmin}
        />
      )}
      <Footer />
    </>
  );
};

export default Drives;

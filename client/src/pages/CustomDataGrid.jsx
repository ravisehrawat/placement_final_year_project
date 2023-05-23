import React, { useState } from "react";
import MaterialReactTable from "material-react-table";
import { MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import fetchData from "../utils/apiCall";
import { useDriveContext } from "../context/driveContext";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const CustomDataGrid = ({
  columns,
  data,
  drive,
  applicants,
  applications,
  admin,
  users,
  setData,
  url,
}) => {
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userDetails"))._id
  );
  const { isLoading, setLoading } = useDriveContext();
  const navigate = useNavigate();

  const shortlist = async (arr) => {
    const { data } = await toast.promise(
      axios.post(
        `/application/shortlist-application/${userId}`,
        { arr },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      {
        success: "Candidates shortlisted",
        error: "Unable to shortlist candidates",
        loading: "Shortlisting candidates...",
      }
    );
    setLoading(true);
    const temp = await fetchData(url);
    setData(temp);
    setLoading(false);
    return data;
  };

  const decline = async (arr) => {
    const { data } = await toast.promise(
      axios.post(
        `/application/decline-application/${userId}`,
        { arr },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      {
        success: "Candidates rejected",
        error: "Unable to reject candidates",
        loading: "Rejecting candidates...",
      }
    );
    setLoading(true);
    const temp = await fetchData(url);
    setData(temp);
    setLoading(false);
    return data;
  };

  const makeCoordinator = async (arr) => {
    const { data } = await toast.promise(
      axios.put(
        `/user/make-coordinator/${userId}`,
        { arr },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      {
        success: "Students updated",
        error: "Unable to update students",
        loading: "Updating students...",
      }
    );
    setLoading(true);
    const temp = await fetchData(url);
    setData(temp);
    setLoading(false);
    return data;
  };

  const drivesMenuAction = (row, closeMenu) => {
    navigate(`/job/${data[row.id]._id}`);
    return closeMenu();
  };

  const ApplicationMenuAction = (row, closeMenu) => {
    navigate(`/job/${data[row.id].driveId._id}`);
    return closeMenu();
  };

  const ProfileMenuAction = (row, closeMenu) => {
    navigate(`/candidate/${data[row.id].userId._id}`);
    return closeMenu();
  };

  const InchargeProfileMenuAction = (row, closeMenu) => {
    navigate(`/candidate/${data[row.id]._id}`);
    return closeMenu();
  };

  return (
    <div className="container data-grid">
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnFilterModes
        enableRowActions
        enableRowSelection
        initialState={{ showColumnFilters: false }}
        positionToolbarAlertBanner="bottom"
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              return drive
                ? drivesMenuAction(row, closeMenu)
                : applications
                ? ApplicationMenuAction(row, closeMenu)
                : users
                ? InchargeProfileMenuAction(row, closeMenu)
                : ProfileMenuAction(row, closeMenu);
            }}
            sx={{ m: 0 }}
          >
            {drive || applications ? "View Job" : "View Profile"}
          </MenuItem>,
        ]}
        renderTopToolbarCustomActions={({ table }) => {
          const handleDecline = () => {
            let arr = [];
            table.getSelectedRowModel().flatRows.map((row) => {
              arr.push(data[row.id]);
            });
            decline(arr);
          };

          const handleShortlist = () => {
            let arr = [];
            table.getSelectedRowModel().flatRows.map((row) => {
              arr.push(data[row.id]);
            });
            shortlist(arr);
          };

          const handleMakeCoordinator = () => {
            let arr = [];
            table.getSelectedRowModel().flatRows.map((row) => {
              arr.push(data[row.id]);
            });
            makeCoordinator(arr);
          };

          return (
            <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem" }}>
              {applicants && (
                <>
                  <button
                    className="btn danger-btn"
                    onClick={handleDecline}
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleShortlist}
                    className="btn"
                  >
                    Shortlist
                  </button>
                </>
              )}
              {drive && admin && (
                <NavLink
                  to={"/create-drive"}
                  className="btn"
                >
                  Create Drive
                </NavLink>
              )}
              {users && admin && (
                <button
                  onClick={handleMakeCoordinator}
                  className="btn"
                >
                  Make Coordinator
                </button>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomDataGrid;

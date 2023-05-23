import React, { useEffect, useState } from "react";
import "../styles/jobDetails.css";
import "../styles/candidateDetails.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useUserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import fetchData from "../utils/apiCall";
import Loading from "../components/Loading";
import PriceFormat from "../components/PriceFormat";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const JobDetails = () => {
  const driveId = useParams().id;
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [jobData, setJobData] = useState({});
  const { isLoading, setLoading } = useUserContext();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );

  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await fetchData(`/drive/get-drive/${user._id}/${driveId}`);
      setJobData(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const applyHandle = async () => {
    try {
      if (user.address == "" || user.address == null)
        return toast.error("Please update your profile before applying");
      if (jobData.branches != "all" && jobData.branches != user.branch) {
        return toast.error("Your branch is not eligible to apply to this job");
      }
      if (parseFloat(jobData.minCGPA) > user.cgpa) {
        return toast.error("Your CGPA is lower than the minimum required CGPA");
      }
      if (jobData.backlogs > user.backlogs) {
        return toast.error("Number of backlogs is greater than expected");
      }
      if (jobData.gender != "all" && jobData.gender != user.gender) {
        return toast.error("Your gender is not allowed");
      }

      setBtnLoading(true);
      await toast.promise(
        axios.post(
          `/application/create-application/${user._id}`,
          {
            driveId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Applied successfully",
          error: "Unable to apply",
          loading: "Applying...",
        }
      );
      setBtnLoading(false);
      navigate("/applications");
    } catch (error) {
      setBtnLoading(false);
      return error;
    }
  };

  const timeLeft = () => {
    var date1 = new Date(jobData.lastDate).getTime();
    var date2 = Date.now();
    var diffDays = 1 + parseInt((date1 - date2) / (1000 * 60 * 60 * 24), 10);
    return diffDays >= 0 ? 1 : 0;
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading && <Loading />}
      {!isLoading && jobData && (
        <div className="box-container job-details-body">
          <div className="job-details-top">
            <div className="company-logo flex-center">
              <img
                src={jobData.pic}
                alt="company logo"
              />
            </div>
            <div className="job-top-content">
              <div className="job-top-left">
                <h3 className="job-role">{jobData.jobTitle}</h3>
                <div>
                  <span className="job-company-name">
                    {jobData.companyName}
                  </span>
                  <span className="job-type">{jobData.jobType}</span>
                </div>
              </div>
              <div className="job-top-right">
                {!user.incharge && (
                  <button
                    className={`btn job-btn ${
                      !timeLeft() || btnLoading ? "disable-btn" : ""
                    }`}
                    onClick={applyHandle}
                  >
                    Apply
                  </button>
                )}
                <div className="job-last-date">
                  <b>Last date: </b>
                  <span>{jobData.lastDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="job-details-bottom">
            <div className="job-bottom-left">
              <div className="company-desc">
                <h3 className="job-sub-heading">Company Overview</h3>
                <p className="job-description">{jobData.companyOverview}</p>
              </div>
              <div className="job-desc">
                <h3 className="job-sub-heading">Job Description</h3>
                <p className="job-description">{jobData.jobDesc}</p>
              </div>
            </div>
            <div className="job-bottom-right">
              <h3 className="job-sub-heading">Job Details</h3>
              <div className="job-details-content">
                <div className="job-details-row">
                  <div className="job-details-row-content">
                    <span className="job-details-row-heading">Package</span>
                    <b className="job-details-row-bold">
                      <PriceFormat price={jobData.salary} />
                    </b>
                  </div>
                  <div className="job-details-row-content flex-end">
                    <span className="job-details-row-heading ">Location</span>
                    <b className="job-details-row-bold">{jobData.location}</b>
                  </div>
                </div>
                <div className="job-details-row">
                  <div className="job-details-row-content">
                    <span className="job-details-row-heading">Bond</span>
                    <b className="job-details-row-bold">
                      {jobData.bond} months
                    </b>
                  </div>
                  <div className="job-details-row-content flex-end">
                    <span className="job-details-row-heading">
                      Minimum CGPA
                    </span>
                    <b className="job-details-row-bold">{jobData.minCGPA}</b>
                  </div>
                </div>
                <div className="job-details-row">
                  <div className="job-details-row-content">
                    <span className="job-details-row-heading">
                      Minimum Backlogs
                    </span>
                    <b className="job-details-row-bold">{jobData.backlogs}</b>
                  </div>
                  <div className="job-details-row-content flex-end">
                    <span className="job-details-row-heading">Vacancies</span>
                    <b className="job-details-row-bold">{jobData.vacancy}</b>
                  </div>
                </div>
                <div className="job-details-row">
                  <div className="job-details-row-content">
                    <span className="job-details-row-heading">
                      Gender Eligibility
                    </span>
                    <b className="job-details-row-bold">{jobData.gender}</b>
                  </div>
                  <div className="job-details-row-content flex-end">
                    <span className="job-details-row-heading">Branches</span>
                    <b className="job-details-row-bold">{jobData.branches}</b>
                  </div>
                </div>
                <div className="job-details-row-content">
                  <span className="job-details-row-heading">Tags</span>
                  <div className="job-tags">
                    {jobData.tags?.map((e) => {
                      return (
                        <span
                          key={e}
                          className="job-type"
                        >
                          {e}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default JobDetails;

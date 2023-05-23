import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/candidateDetails.css";
import { useUserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import fetchData from "../utils/apiCall";
import Loading from "../components/Loading";

const CandidateDetails = () => {
  const userId = useParams().id;
  const [userData, setUserData] = useState({});
  const { isLoading, setLoading } = useUserContext();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await fetchData(`/user/get-user/${user._id}/${userId}`);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      <Navbar />
      {isLoading && <Loading />}
      {!isLoading && userData && (
        <div className="box-container">
          <div className="candidate-details">
            <h1>{userData.fullName}</h1>
            <div className="profile-main"></div>
            <div className="candidate-top">
              <a href={`tel:${userData.phoneNo}`}>+{userData.phoneNo}</a>
              <a
                href={`${userData.linkedin}`}
                target={"_blank"}
              >
                LinkedIn
              </a>
              <a
                href={`${userData.github}`}
                target={"_blank"}
              >
                Github
              </a>
              <a href={`mailto:${userData.email}`}>Email</a>
            </div>
          </div>
          <div className="candidate-block">
            <h2 className="candidate-sub-heading">Skills</h2>
            <div className="candidate-skills">
              {userData.skills?.map((e) => {
                return <span key={e}>{e}, </span>;
              })}
            </div>
          </div>
          <div className="candidate-block">
            <h2 className="candidate-sub-heading">Work Experience</h2>
            <div className="candidate-sub-block">
              {userData.experience?.map((e) => {
                return (
                  <div
                    key={e.companyName}
                    className="candidate-sub-container"
                  >
                    <div className="candidate-semi-heading">
                      <h3>{e.companyName}</h3>
                      <span>
                        {e.from} - {e.to}
                      </span>
                    </div>
                    <span className="candidate-job-role">{e.jobRole}</span>
                    <p className="candidate-job-description">{e.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="candidate-block">
            <h2 className="candidate-sub-heading">Projects</h2>
            <div className="candidate-sub-block">
              {userData.projects?.map((e) => {
                return (
                  <div
                    key={e.projectName}
                    className="candidate-sub-container"
                  >
                    <div className="candidate-semi-heading">
                      <h3>{e.projectName}</h3>
                      <span>
                        {e.from} - {e.to}
                      </span>
                    </div>
                    <a
                      href={`${e.link}`}
                      target={"_blank"}
                    >
                      Project Demo
                    </a>
                    <p className="candidate-job-description">{e.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="candidate-block">
            <h2 className="candidate-sub-heading">Education</h2>
            <div className="candidate-sub-block">
              {userData.education?.map((e) => {
                return (
                  <div
                    key={e.name}
                    className="candidate-sub-container"
                  >
                    <div className="candidate-semi-heading">
                      <h3>{e.name}</h3>
                      <span>
                        {e.from} - {e.to}
                      </span>
                    </div>
                    <span className="candidate-job-role">{e.course}</span>
                    <p className="candidate-job-description">{e.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="candidate-block">
            <h2 className="candidate-sub-heading">Hobbies</h2>
            <p className="candidate-hobbies">{userData.hobbies}</p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CandidateDetails;

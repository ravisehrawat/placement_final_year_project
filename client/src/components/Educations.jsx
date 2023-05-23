import React from "react";
import { MdDelete } from "react-icons/md";
import "../styles/skills.css";

const Educations = ({
  educationModal,
  setEducationModal,
  educations,
  setEducations,
}) => {
  const removeEducation = (ele) => {
    let newEducations = educations.filter((w) => {
      return w.companyName != ele.companyName;
    });
    setEducations(newEducations);
  };

  return (
    <section className="profile-skills">
      <div className="profile-skills-top">
        <h3>Education</h3>
        <button
          className="btn profile-add-btn"
          onClick={() => setEducationModal(!educationModal)}
        >
          Add Education
        </button>
      </div>
      <div className="profile-skills-container">
        {educations.map((w, i) => {
          return (
            <div
              className="profile-work"
              key={w.name + "-" + i}
            >
              <div className="profile-work-top">
                <div className="profile-work-top-left">
                  <h4 className="profile-company-name">{w.name}</h4>
                  <h5 className="profile-job-role">{w.course}</h5>
                </div>
                <div className="profile-work-top-right">
                  <span>
                    {w.from} to {w.to}
                  </span>
                  <MdDelete
                    onClick={() => removeEducation(w)}
                    className="work-delete-btn"
                  />
                </div>
              </div>
              <p className="profile-company-desc">{w.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Educations;

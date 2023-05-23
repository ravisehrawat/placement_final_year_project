import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "../styles/work.css";

const Works = ({ workModal, setWorkModal, works, setWorks }) => {
  const removeWork = (ele) => {
    let newWorks = works.filter((w) => {
      return w.companyName != ele.companyName;
    });
    setWorks(newWorks);
  };

  return (
    <section className="profile-skills">
      <div className="profile-skills-top">
        <h3>Work Experience</h3>
        <button
          className="btn profile-add-btn"
          onClick={() => setWorkModal(!workModal)}
        >
          Add Experience
        </button>
      </div>
      <div className="profile-skills-container">
        {works.map((w, i) => {
          return (
            <div
              className="profile-work"
              key={w.jobRole + "-" + i}
            >
              <div className="profile-work-top">
                <div className="profile-work-top-left">
                  <h4 className="profile-company-name">{w.companyName}</h4>
                  <h5 className="profile-job-role">{w.jobRole}</h5>
                </div>
                <div className="profile-work-top-right">
                  <span>
                    {w.from} to {w.to}
                  </span>
                  <MdDelete
                    onClick={() => removeWork(w)}
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

export default Works;

import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "../styles/skills.css";

const Projects = ({ projectModal, setProjectModal, projects, setProjects }) => {
  const removeProject = (ele) => {
    let newProjects = projects.filter((p) => {
      return p.projectName != ele.projectName;
    });
    setProjects(newProjects);
  };
  return (
    <section className="profile-skills">
      <div className="profile-skills-top">
        <h3>Projects</h3>
        <button
          className="btn profile-add-btn"
          onClick={() => setProjectModal(!projectModal)}
        >
          Add Project
        </button>
      </div>
      <div className="profile-skills-container">
        {projects.map((w) => {
          return (
            <div
              className="profile-work"
              key={w.projectName}
            >
              <div className="profile-work-top">
                <div className="profile-work-top-left">
                  <a
                    href={w.link}
                    target="_blank"
                    className="profile-project-link"
                  >
                    {w.projectName}
                  </a>
                </div>
                <div className="profile-work-top-right">
                  <span>
                    {w.from} to {w.to}
                  </span>
                  <MdDelete
                    onClick={() => removeProject(w)}
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

export default Projects;

import React, { useRef } from "react";
import "../styles/modal.css";
import { IoMdClose } from "react-icons/io";

const ProjectModal = ({
  setProjectModal,
  project,
  projectHandler,
  projectAddHandler,
}) => {
  const ref1 = useRef();
  const ref2 = useRef();

  return (
    <>
      <div className="modal flex-center">
        <div className="modal-content">
          <h2 className="page-heading">Add Project</h2>
          <IoMdClose
            onClick={() => {
              setProjectModal(false);
            }}
            className="close-btn"
          />
          <div className="flex-center modal-container">
            <div className="input">
              <input
                type="text"
                name="projectName"
                value={project.projectName}
                onChange={projectHandler}
                required
                className="input-field"
                minLength="5"
              />
              <label className="input-label">Project Name</label>
            </div>

            <div className="input">
              <input
                type="text"
                name="link"
                value={project.link}
                onChange={projectHandler}
                required
                minLength="5"
                className="input-field"
              />
              <label className="input-label">Project Link</label>
            </div>

            <div className="input">
              <textarea
                name="description"
                cols="30"
                rows="3"
                value={project.description}
                onChange={projectHandler}
                placeholder="Description"
                className="input-field"
              ></textarea>
            </div>

            <div className="input">
              <input
                type="text"
                name="from"
                value={project.from}
                onChange={projectHandler}
                placeholder="From"
                className="input-field"
                required
                ref={ref1}
                onFocus={() => (ref1.current.type = "month")}
                onBlur={() => (ref1.current.type = "text")}
              />
            </div>

            <div className="input">
              <input
                type="text"
                name="to"
                value={project.to}
                onChange={projectHandler}
                placeholder="To"
                className="input-field"
                required
                ref={ref2}
                onFocus={() => (ref2.current.type = "month")}
                onBlur={() => (ref2.current.type = "text")}
              />
            </div>
            <button
              className="btn"
              onClick={projectAddHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;

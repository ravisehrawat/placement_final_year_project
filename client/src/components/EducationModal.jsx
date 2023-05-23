import React, { useRef } from "react";
import "../styles/modal.css";
import { IoMdClose } from "react-icons/io";

const EducationModal = ({
  setEducationModal,
  education,
  educationHandler,
  educationAddHandler,
}) => {
  const ref1 = useRef();
  const ref2 = useRef();

  return (
    <>
      <div className="modal flex-center">
        <div className="modal-content">
          <h2 className="page-heading">Add Education</h2>
          <IoMdClose
            onClick={() => {
              setEducationModal(false);
            }}
            className="close-btn"
          />
          <div className="flex-center modal-container">
            <div className="input">
              <input
                type="text"
                name="name"
                value={education.name}
                onChange={educationHandler}
                className="input-field"
                required
                minLength="3"
              />
              <label className="input-label">School/College Name</label>
            </div>
            <div className="input">
              <input
                type="text"
                name="course"
                value={education.course}
                onChange={educationHandler}
                className="input-field"
                required
                minLength="3"
              />
              <label className="input-label">Course of Study</label>
            </div>
            <div className="input">
              <textarea
                name="description"
                cols="30"
                rows="3"
                value={education.description}
                onChange={educationHandler}
                className="input-field"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="input">
              <input
                type="text"
                name="from"
                value={education.from}
                onChange={educationHandler}
                className="input-field"
                ref={ref1}
                onFocus={() => (ref1.current.type = "month")}
                onBlur={() => (ref1.current.type = "text")}
                placeholder="From"
                required
              />
            </div>
            <div className="input">
              <input
                type="text"
                name="to"
                value={education.to}
                onChange={educationHandler}
                className="input-field"
                ref={ref2}
                onFocus={() => (ref2.current.type = "month")}
                onBlur={() => (ref2.current.type = "text")}
                placeholder="To"
                required
              />
            </div>
            <button
              className="btn"
              onClick={educationAddHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationModal;

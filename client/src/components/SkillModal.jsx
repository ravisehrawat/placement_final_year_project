import React from "react";
import "../styles/modal.css";
import { IoMdClose } from "react-icons/io";

const SkillModal = ({
  setSkillModal,
  skill,
  skillHandler,
  skillAddHandler,
  title,
  label,
}) => {
  return (
    <>
      <div className="modal flex-center">
        <div className="modal-content">
          <h2 className="page-heading">{title}</h2>
          <IoMdClose
            onClick={() => {
              setSkillModal(false);
            }}
            className="close-btn"
          />
          <div className="flex-center modal-container">
            <div className="add-skill">
              <div className="input">
                <input
                  type="text"
                  name="skill"
                  value={skill}
                  onChange={skillHandler}
                  required
                  className="input-field"
                />
                <label className="input-label">{label}</label>
              </div>
            </div>
            <button
              className="btn"
              type="submit"
              onClick={skillAddHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillModal;

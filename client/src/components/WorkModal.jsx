import React, { useRef, useState } from "react";
import "../styles/modal.css";
import { IoMdClose } from "react-icons/io";

const WorkModal = ({ setWorkModal, work, workHandler, workAddHandler }) => {
  const ref1 = useRef();
  const ref2 = useRef();

  return (
    <>
      <div className="modal flex-center">
        <div className="modal-content">
          <h2 className="page-heading">Add Work</h2>
          <IoMdClose
            onClick={() => {
              setWorkModal(false);
            }}
            className="close-btn"
          />
          <div className="flex-center modal-container">
            <div className="input">
              <input
                type="text"
                name="companyName"
                value={work.companyName}
                onChange={workHandler}
                required
                minLength="5"
                className="input-field"
              />
              <label className="input-label">Company Name</label>
            </div>

            <div className="input">
              <input
                type="text"
                name="jobRole"
                value={work.jobRole}
                onChange={workHandler}
                className="input-field"
                required
                minLength="5"
              />
              <label className="input-label">Job Role</label>
            </div>

            <div className="input">
              <textarea
                name="description"
                cols="30"
                rows="3"
                value={work.description}
                onChange={workHandler}
                className="input-field"
                placeholder="Description"
              ></textarea>
            </div>

            <div className="input">
              <input
                type="text"
                name="from"
                value={work.from}
                onChange={workHandler}
                className="input-field"
                placeholder="From"
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
                value={work.to}
                onChange={workHandler}
                className="input-field"
                placeholder="To"
                required
                ref={ref2}
                onFocus={() => (ref2.current.type = "month")}
                onBlur={() => (ref2.current.type = "text")}
              />
            </div>
            <button
              className="btn"
              onClick={workAddHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkModal;

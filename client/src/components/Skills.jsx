import React from "react";
import { IoMdClose } from "react-icons/io";
import "../styles/skills.css";

const Skills = ({
  skillModal,
  setSkillModal,
  skills,
  setSkills,
  title,
  buttonText,
}) => {
  const removeSkill = (ele) => {
    let newSkills = skills.filter((skill) => {
      return skill != ele;
    });
    setSkills(newSkills);
  };

  return (
    <section className="profile-skills">
      <div className="profile-skills-top">
        <h3>{title}</h3>
        <button
          className="btn profile-add-btn"
          onClick={() => setSkillModal(!skillModal)}
        >
          {buttonText}
        </button>
      </div>
      <div className="profile-skills-container">
        {skills.map((sk) => {
          return (
            <div
              className="profile-skill"
              key={sk}
            >
              <span>{sk}</span>
              <IoMdClose
                onClick={() => removeSkill(sk)}
                className="skill-close-btn"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;

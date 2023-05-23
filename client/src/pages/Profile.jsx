import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import SkillModal from "../components/SkillModal";
import "../styles/profile.css";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Works from "../components/Works";
import WorkModal from "../components/WorkModal";
import ProjectModal from "../components/ProjectModal";
import Educations from "../components/Educations";
import EducationModal from "../components/EducationModal";
import { useUserContext } from "../context/userContext";
import Loading from "../components/Loading";

const Profile = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const { isLoading } = useUserContext();
  const [skillModal, setSkillModal] = useState(false);
  const [workModal, setWorkModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState(user.skills || []);
  const [work, setWork] = useState({
    companyName: "",
    jobRole: "",
    description: "",
    from: "",
    to: "",
  });
  const [works, setWorks] = useState(user.experience || []);
  const [project, setProject] = useState({
    projectName: "",
    link: "",
    description: "",
    from: "",
    to: "",
  });
  const [projects, setProjects] = useState(user.projects || []);
  const [education, setEducation] = useState({
    name: "",
    course: "",
    description: "",
    from: "",
    to: "",
  });
  const [educations, setEducations] = useState(user.education || []);
  const [files, setFiles] = useState(user.pic || "");
  const [formDetails, setFormDetails] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phoneNo: user.phoneNo || "",
    address: user.address || "",
    branch: user.branch || "cse",
    gender: user.gender || "male",
    github: user.github || "",
    linkedin: user.linkedin || "",
    hobbies: user.hobbies || "",
    cgpa: user.cgpa || "",
    backlogs: user.backlogs || "",
  });
  const options = [
    {
      label: "CSE",
      value: "cse",
    },
    {
      label: "ECE",
      value: "ece",
    },
    {
      label: "EEE",
      value: "eee",
    },
    {
      label: "Mechanical",
      value: "mechanical",
    },
    {
      label: "Civil",
      value: "civil",
    },
    {
      label: "Bio-Technology",
      value: "biotech",
    },
    {
      label: "Metallurgy",
      value: "metallurgy",
    },
    {
      label: "Chemical",
      value: "chemical",
    },
  ];

  const inputChange = (event) => {
    const { name, value } = event.target;
    return setFormDetails({ ...formDetails, [name]: value });
  };

  const skillAddHandler = () => {
    if (skill == "") return toast.error("Please provide a valid skill");
    let filled = true;
    skills.forEach((ele) => {
      if (ele.toLowerCase() == skill.toLowerCase()) return (filled = false);
    });
    if (!filled) return toast.error("Skill already present");

    setSkills([...skills, skill]);
    setSkill("");
    setSkillModal(false);
  };

  const skillHandler = (e) => {
    setSkill(e.target.value);
  };

  const workAddHandler = () => {
    let filled = true;
    Object.keys(work).forEach((ele) => {
      if (work[ele] == "") return (filled = false);
    });
    if (!filled) return toast.error("Please fill all the fields");

    setWorks([...works, work]);
    setWork({
      companyName: "",
      jobRole: "",
      description: "",
      from: "",
      to: "",
    });
    setWorkModal(false);
  };

  const workHandler = (e) => {
    setWork({ ...work, [e.target.name]: e.target.value });
  };

  const projectAddHandler = () => {
    let filled = true;
    Object.keys(project).forEach((ele) => {
      if (project[ele] == "") return (filled = false);
    });
    if (!filled) return toast.error("Please fill all the fields");

    if (project == "") return;
    setProjects([...projects, project]);
    setProject({
      projectName: "",
      link: "",
      description: "",
      from: "",
      to: "",
    });
    setProjectModal(false);
  };

  const projectHandler = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const educationAddHandler = () => {
    let filled = true;
    Object.keys(education).forEach((ele) => {
      if (education[ele] == "") return (filled = false);
    });
    if (!filled) return toast.error("Please fill all the fields");

    if (education == "") return;
    setEducations([...educations, education]);
    setEducation({
      name: "",
      course: "",
      description: "",
      from: "",
      to: "",
    });
    setEducationModal(false);
  };

  const educationHandler = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (imgLoading) return;
      if (files == "") return toast.error("Please upload your image");
      if (formDetails.branch == "")
        return toast.error("Please select your branch");
      if (formDetails.github == "")
        return toast.error("Please provide your github profile link");
      if (formDetails.linkedin == "")
        return toast.error("Please provide your linkedIn profile link");
      if (formDetails.cgpa == "")
        return toast.error("Please provide your current cgpa");
      if (formDetails.backlogs == "")
        return toast.error("Please enter number of active backlogs");

      setBtnLoading(true);

      const { data } = await toast.promise(
        axios.put(
          `/user/update-profile/${user.id}`,
          {
            ...formDetails,
            pic: files,
            skills,
            experience: works,
            projects,
            education: educations,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Profile updated successfully",
          error: "Unable to update profile",
          loading: "Updating profile...",
        }
      );
      localStorage.setItem("userDetails", JSON.stringify(data.data));
      setBtnLoading(false);
    } catch (error) {
      toast.error("Couldn't update profile");
      setBtnLoading(false);
      return error;
    }
  };

  const onUpload = (element) => {
    setImgLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", "zenstore");
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      fetch(import.meta.env.VITE_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => setFiles(data.url.toString()));
      setImgLoading(false);
    } else {
      setImgLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  return (
    <>
      <Navbar />
      {isLoading && <Loading />}
      {!isLoading && (
        <section className="profile-section">
          <div className="container profile-container">
            <h2 className="profile-heading">Profile</h2>
            <form
              onSubmit={handleSubmit}
              className="profile-form"
            >
              <div className="same-row">
                <div className="input">
                  <input
                    type="text"
                    name="fullName"
                    value={formDetails.fullName}
                    onChange={inputChange}
                    required
                    minLength="5"
                    className="input-field"
                  />
                  <label className="input-label">Enter your Name</label>
                </div>
                <div className="input">
                  <input
                    type="email"
                    name="email"
                    value={formDetails.email}
                    onChange={inputChange}
                    required
                    minLength="5"
                    className="input-field"
                  />
                  <label className="input-label">Enter your Email</label>
                </div>
              </div>
              <div className="same-row">
                <div className="input">
                  <input
                    type="number"
                    name="phoneNo"
                    value={formDetails.phoneNo}
                    onChange={inputChange}
                    className="input-field"
                    required
                  />
                  <label className="input-label">Enter your phone number</label>
                </div>
                <div className="input">
                  <input
                    type="file"
                    name="pic"
                    onChange={(e) => {
                      onUpload(e.target.files[0]);
                    }}
                    required
                    className="file-input"
                    minLength="5"
                  />
                </div>
              </div>
              <div className="input">
                <textarea
                  name="address"
                  cols="30"
                  rows="1"
                  value={formDetails.address}
                  onChange={inputChange}
                  className="input-field"
                  placeholder="Address"
                ></textarea>
              </div>

              <div className="same-row">
                <div className="input">
                  <select
                    name="branch"
                    value={formDetails.branch}
                    onChange={inputChange}
                    placeholder="Select your Branch"
                    required
                    className="input-field"
                  >
                    <option
                      value="nil"
                      disabled
                    >
                      Select your branch
                    </option>
                    {options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input">
                  <select
                    name="gender"
                    value={formDetails.gender}
                    onChange={inputChange}
                    placeholder="Select your Gender"
                    required
                    className="input-field"
                  >
                    <option
                      value="nil"
                      disabled
                    >
                      Select Your Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="same-row">
                <div className="input">
                  <input
                    type="text"
                    name="github"
                    value={formDetails.github}
                    onChange={inputChange}
                    required
                    className="input-field"
                    minLength="5"
                  />
                  <label className="input-label">Github Profile Link</label>
                </div>

                <div className="input">
                  <input
                    type="text"
                    name="linkedin"
                    value={formDetails.linkedin}
                    onChange={inputChange}
                    required
                    className="input-field"
                    minLength="5"
                  />
                  <label className="input-label">Linkedin Profile Link</label>
                </div>
              </div>
              <div className="same-row">
                <div className="input">
                  <input
                    type="text"
                    name="cgpa"
                    value={formDetails.cgpa}
                    onChange={inputChange}
                    required
                    className="input-field"
                  />
                  <label className="input-label">Current CGPA</label>
                </div>
                <div className="input">
                  <input
                    type="number"
                    name="backlogs"
                    value={formDetails.backlogs}
                    onChange={inputChange}
                    required
                    className="input-field"
                    minLength="5"
                  />
                  <label className="input-label">
                    Number of Active Backlogs
                  </label>
                </div>
              </div>
              <Skills
                title={"Skills"}
                buttonText={"Add Skill"}
                skillModal={skillModal}
                setSkillModal={setSkillModal}
                skills={skills}
                setSkills={setSkills}
              />
              {skillModal && (
                <SkillModal
                  title={"Skills"}
                  label={"Enter Skill"}
                  setSkillModal={setSkillModal}
                  skill={skill}
                  setSkill={setSkill}
                  skillHandler={skillHandler}
                  skillAddHandler={skillAddHandler}
                />
              )}
              <Works
                workModal={workModal}
                setWorkModal={setWorkModal}
                works={works}
                setWorks={setWorks}
              />
              {workModal && (
                <WorkModal
                  setWorkModal={setWorkModal}
                  work={work}
                  setWork={setWork}
                  workHandler={workHandler}
                  workAddHandler={workAddHandler}
                />
              )}
              <Projects
                projectModal={projectModal}
                setProjectModal={setProjectModal}
                projects={projects}
                setProjects={setProjects}
              />
              {projectModal && (
                <ProjectModal
                  setProjectModal={setProjectModal}
                  project={project}
                  setProject={setProject}
                  projectHandler={projectHandler}
                  projectAddHandler={projectAddHandler}
                />
              )}
              <Educations
                educationModal={educationModal}
                setEducationModal={setEducationModal}
                educations={educations}
                setEducations={setEducations}
              />
              {educationModal && (
                <EducationModal
                  setEducationModal={setEducationModal}
                  education={education}
                  setEducation={setEducation}
                  educationHandler={educationHandler}
                  educationAddHandler={educationAddHandler}
                />
              )}
              <section className="profile-hobbies">
                <h3>Hobbies</h3>
                <div className="input">
                  <textarea
                    name="hobbies"
                    cols="30"
                    rows="1"
                    value={formDetails.hobbies}
                    className="input-field"
                    onChange={inputChange}
                  ></textarea>
                  <label className="input-label">
                    Enter Your Hobbies (Comma separated)
                  </label>
                </div>
              </section>
              <button
                type="submit"
                className={`btn profile-btn ${btnLoading ? "disable-btn" : ""}`}
              >
                {btnLoading ? "Updating Profile..." : "Update"}
              </button>
            </form>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Profile;

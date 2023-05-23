import React, { useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import SkillModal from "../components/SkillModal";
import Skills from "../components/Skills";

const CreateDrive = () => {
  const ref = useRef();
  const [skillModal, setSkillModal] = useState(false);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userDetails"))._id
  );
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [formDetails, setFormDetails] = useState({
    jobTitle: "",
    companyName: "",
    companyOverview: "",
    jobDesc: "",
    website: "",
    gender: "all",
    tierNumber: "",
    vacancy: "",
    location: "",
    jobType: "full time",
    minCGPA: "",
    bond: "",
    backlogs: "",
    branches: "all",
    lastDate: "",
    salary: "",
    totalRounds: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    return setFormDetails({ ...formDetails, [name]: value });
  };

  const skillAddHandler = () => {
    if (tag == "") return toast.error("Please provide a valid tag");
    let filled = true;
    tags.forEach((ele) => {
      if (ele.toLowerCase() == tag.toLowerCase()) return (filled = false);
    });
    if (!filled) return toast.error("Tag already present");

    setTags([...tags, tag]);
    setTag("");
    setSkillModal(false);
  };

  const skillHandler = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (imgLoading) return;
      if (files == "") return toast.error("Please upload company logo");
      if (formDetails.tierNumber === "")
        return toast.error("Please select the tier");
      if (formDetails.vacancy < 0)
        return toast.error("Please select valid vacancies");
      if (formDetails.jobType === "")
        return toast.error("Please select job type");
      if (formDetails.gender === "")
        return toast.error("Please select eligible gender");
      if (formDetails.minCGPA < 0)
        return toast.error("Please select valid minimum CGPA");
      if (formDetails.bond < 0)
        return toast.error("Please select valid bond period");
      if (formDetails.backlogs < 0)
        return toast.error("Please select valid allowed backlogs");
      if (formDetails.salary < 0)
        return toast.error("Please select valid salary");
      if (formDetails.totalRounds <= 0)
        return toast.error("Please select number of rounds");

      setBtnLoading(true);

      await toast.promise(
        axios.post(
          `/drive/add-drive/${userId}`,
          {
            ...formDetails,
            pic: files,
            tags,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Drive created successfully",
          error: "Unable to create drive",
          loading: "Creating drive...",
        }
      );
      setBtnLoading(false);
      setFormDetails({
        jobTitle: "",
        companyName: "",
        companyOverview: "",
        jobDesc: "",
        website: "",
        gender: "",
        tierNumber: "",
        vacancy: "",
        location: "",
        jobType: "",
        minCGPA: "",
        bond: "",
        backlogs: "",
        branches: "",
        lastDate: "",
        salary: "",
        totalRounds: "",
      });
      setTags([]);
    } catch (error) {
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
      <section className="profile-section">
        <div className="container profile-container">
          <h2 className="profile-heading">Create drive</h2>
          <form
            onSubmit={handleSubmit}
            className="drive-form"
          >
            <div className="same-row">
              <div className="input">
                <input
                  type="text"
                  name="jobTitle"
                  value={formDetails.jobTitle}
                  onChange={inputChange}
                  className="input-field"
                  required
                  minLength="5"
                />
                <label className="input-label">Job Title</label>
              </div>
              <div className="input">
                <input
                  type="text"
                  name="companyName"
                  className="input-field"
                  value={formDetails.companyName}
                  onChange={inputChange}
                  required
                  minLength="3"
                />
                <label className="input-label">Company Name</label>
              </div>
            </div>
            <div className="input">
              <textarea
                name="companyOverview"
                cols="30"
                rows="3"
                required
                className="input-field"
                value={formDetails.companyOverview}
                onChange={inputChange}
                placeholder="Company Overview"
              ></textarea>
            </div>
            <div className="input">
              <textarea
                name="jobDesc"
                cols="30"
                rows="3"
                required
                className="input-field"
                value={formDetails.jobDesc}
                onChange={inputChange}
                placeholder="Job Description"
              ></textarea>
            </div>
            <div className="same-row">
              <div className="input">
                <input
                  type="text"
                  className="input-field"
                  name="website"
                  value={formDetails.website}
                  onChange={inputChange}
                  required
                />
                <label className="input-label">Website Link</label>
              </div>
              <div className="input">
                <select
                  name="gender"
                  value={formDetails.gender}
                  onChange={inputChange}
                  placeholder="Gender Eligibility"
                  required
                >
                  <option
                    value="gender"
                    disabled
                  >
                    Gender Eligibility
                  </option>
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="same-row">
              <div className="input">
                <input
                  type="number"
                  name="totalRounds"
                  value={formDetails.totalRounds}
                  onChange={inputChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Total No. of Rounds</label>
              </div>
              <div className="input">
                <input
                  type="file"
                  name="companyLogo"
                  onChange={(e) => {
                    onUpload(e.target.files[0]);
                  }}
                  placeholder="Add Company Logo"
                  required
                  minLength="5"
                />
              </div>
            </div>
            <div className="same-row">
              <div className="input">
                <select
                  name="tierNumber"
                  value={formDetails.tierNumber}
                  onChange={inputChange}
                  placeholder="Tier Number"
                  required
                >
                  <option
                    value="tier"
                    disabled
                  >
                    Tier Number
                  </option>
                  <option value="one">1</option>
                  <option value="two">2</option>
                  <option value="three">3</option>
                  <option value="dream">Dream</option>
                </select>
              </div>
              <div className="input">
                <select
                  name="jobType"
                  value={formDetails.jobType}
                  onChange={inputChange}
                  placeholder="Job Type"
                  required
                >
                  <option
                    value="job-type"
                    disabled
                  >
                    Select Job Type
                  </option>
                  <option value="full time">Full time</option>
                  <option value="internship">Internship</option>
                  <option value="part time">Part time</option>
                </select>
              </div>
            </div>
            <div className="same-row">
              <div className="input">
                <input
                  type="number"
                  name="vacancy"
                  value={formDetails.vacancy}
                  onChange={inputChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Vacancy</label>
              </div>
              <div className="input">
                <input
                  type="text"
                  name="location"
                  value={formDetails.location}
                  onChange={inputChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Location</label>
              </div>
            </div>
            <div className="same-row">
              <div className="input">
                <input
                  type="text"
                  name="minCGPA"
                  value={formDetails.minCGPA}
                  onChange={inputChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Minimum CGPA</label>
              </div>
              <div className="input">
                <input
                  type="number"
                  name="bond"
                  value={formDetails.bond}
                  onChange={inputChange}
                  className="input-field"
                  required
                />
                <label className="input-label">Bond (In Months)</label>
              </div>
            </div>
            <div className="same-row">
              <div className="input">
                <input
                  type="number"
                  name="backlogs"
                  value={formDetails.backlogs}
                  onChange={inputChange}
                  required
                  className="input-field"
                />
                <label className="input-label">No. of Backlogs Allowed</label>
              </div>
              <div className="input">
                <select
                  name="branches"
                  value={formDetails.branches}
                  onChange={inputChange}
                  required
                >
                  <option
                    value="branch"
                    disabled
                  >
                    Select eligible branches
                  </option>
                  <option value="all">All</option>
                  <option value="cse">CSE</option>
                  <option value="ece">ECE</option>
                  <option value="eee">EEE</option>
                  <option value="civil">Civil</option>
                  <option value="mech">Mechanical</option>
                  <option value="bioTech">Bio-Technology</option>
                  <option value="metal">Metallurgy</option>
                  <option value="chem">Chemical</option>
                </select>
              </div>
            </div>
            <div className="same-row">
              <div className="input">
                <input
                  type="number"
                  name="salary"
                  value={formDetails.salary}
                  onChange={inputChange}
                  required
                  className="input-field"
                />
                <label className="input-label">Salary (In Rupees)</label>
              </div>
              <div className="input">
                <input
                  type="text"
                  name="lastDate"
                  value={formDetails.lastDate}
                  onChange={inputChange}
                  required
                  placeholder="Last Apply Date"
                  className="input-field"
                  ref={ref}
                  onFocus={() => (ref.current.type = "date")}
                  onBlur={() => (ref.current.type = "text")}
                />
              </div>
            </div>
            <>
              <Skills
                title={"Tags"}
                buttonText={"Add Tags"}
                skillModal={skillModal}
                setSkillModal={setSkillModal}
                skills={tags}
                setSkills={setTags}
              />
              {skillModal && (
                <SkillModal
                  title={"Tags"}
                  label={"Enter Tag"}
                  setSkillModal={setSkillModal}
                  tag={tag}
                  setSkill={setTag}
                  skillHandler={skillHandler}
                  skillAddHandler={skillAddHandler}
                />
              )}
            </>
            <button
              type="submit"
              className={`btn profile-btn ${btnLoading ? "disable-btn" : ""}`}
            >
              {btnLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreateDrive;

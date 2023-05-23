import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Coordinator, Incharge, Protected, Public } from "./middleware/route";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Error = lazy(() => import("./pages/Error"));
const Drives = lazy(() => import("./pages/Drives"));
const Applications = lazy(() => import("./pages/Applications"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateDrive = lazy(() => import("./pages/CreateDrive"));
const CandidateDetails = lazy(() => import("./pages/CandidateDetails"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const Applicants = lazy(() => import("./pages/Applicants"));
const Users = lazy(() => import("./pages/Users"));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/register"
            element={
              <Public>
                <SignUp />
              </Public>
            }
          />
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/drives"
            element={
              <Protected>
                <Drives />
              </Protected>
            }
          />
          <Route
            path="/job/:id"
            element={
              <Protected>
                <JobDetails />
              </Protected>
            }
          />
          <Route
            path="/create-drive"
            element={
              <Coordinator>
                <CreateDrive />
              </Coordinator>
            }
          />
          <Route
            path="/candidate/:id"
            element={
              <Coordinator>
                <CandidateDetails />
              </Coordinator>
            }
          />
          <Route
            path="/applications"
            element={
              <Protected>
                <Applications />
              </Protected>
            }
          />
          <Route
            path="/users"
            element={
              <Incharge>
                <Users />
              </Incharge>
            }
          />
          <Route
            path="/applicants"
            element={
              <Protected>
                <Applicants />
              </Protected>
            }
          />
          <Route
            path="/contact"
            element={
              <Protected>
                <Contact />
              </Protected>
            }
          />
          <Route
            path="*"
            element={
              <Protected>
                <Error />
              </Protected>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

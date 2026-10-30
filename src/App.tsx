import { useState } from 'react'
import jobfill from "./Jobify Career Search Banner.png"
import jobIllustration from "./Modern Job Search Illustration.png"
import './App.css'

export default function App() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [store, setStore] = useState<string[]>([])
  const [take, setTake] = useState<string[]>([])
  const [screen, setScreen] = useState<string>("start")
  const [, setResume] = useState<File|null>(null);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!name.trim() ||
      !password.trim()
    ) {
      alert("please fill important data")
      return;
    } else if (!name.trim().includes("@")) {
      alert("wrong Email Id")
      return;
    }
    else {
      const value = store.find((num) => num === name)

      if (!value) {
        alert("you have to sign up")
      } else {
        setName("")
        setPassword("")
        setScreen('Home')
      }
    }
  }
  function handleWork() {
    if (!name.trim() ||
      !password.trim()
    ) {
      alert("please fill important data")
      return;
    } else if (!name.trim().includes("@")) {
      alert("wrong Email Id")
      return;
    } else if (store.includes(name.trim())) {
      alert("Email already registered");
      return;
    }
    else {
      setStore([...store, name])
      setTake([...take, password])
      setName("")
      setPassword("")
      setScreen('Home')
    }
  }
  function handlename() {
    setScreen("contact")
  }
  function handleWorld() {
    setScreen("applications")
  }
  function handlejob() {
    setScreen("findJobs")
  }
  function maintain() {
    setScreen("Apply")
  }
  if (screen === 'start') {
    return (
      <div className="app-page">
        <div className="container">
          <div className="first">
            <h2>👨🏼‍💻 Jobify</h2>
          </div>

          <h1>Log in</h1>

          <label className="title">Email Address</label>
          <input
            type="email"
            placeholder="include@withemailid"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="title">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" onClick={handleSubmit}>
            Log In
          </button>

          <div className="last">
            <p>Don't have an account?</p>
            <button className="new" onClick={handleWork}>
              Sign up
            </button>
          </div>

          <div className="footer">
            <footer>"Find your next opportunity with Jobify"</footer>
          </div>
        </div>

        <div className="image">
          <img
            src={jobIllustration}
            alt="Job search illustration"
            className="job-illustration"
          />
        </div>
      </div>
    )
  } else if (screen === 'Home') {
    return (
      <div className="deep">
        <div className="main-work">
          <h1 className="home">👨🏼‍💻 Jobify</h1>
          <div className="dug">
            <button className="think">
              <h2>🏠 Home</h2>
            </button>

            <button className="think" onClick={handlejob}>
              <h2>💼 Find Jobs</h2>
            </button>

            <button className="think" onClick={handleWorld}>
              <h2>📋 My Applications</h2>
            </button>

            <button className="think" onClick={handlename}>
              <h2>👤 Contact</h2>
            </button>
          </div>
        </div>

        <header className="top">
          <input
            className="search"
            type="text"
            placeholder="search for jobs, skills, or company..."
          />
          <h2 id="bell">🔔</h2>
          <h3 id="id">sakshi</h3>
        </header>

        <div className="jobfill">
          <img src={jobfill} alt="Job search banner" />
        </div>

        <h2 className="tool">Explore by Category</h2>

        <div className="team">
          <div className="tea">
            <h2>💻</h2>
            <h2>Technology</h2>
            <h3>Developer jobs</h3>
          </div>

          <div className="tea">
            <h2>📊</h2>
            <h2>Data & Analytics</h2>
            <h3>Analyst jobs</h3>
          </div>

          <div className="tea">
            <h2>🎨</h2>
            <h2>Design</h2>
            <h3>Creative jobs</h3>
          </div>

          <div className="tea">
            <h2>📣</h2>
            <h2>Marketing</h2>
            <h3>Marketing jobs</h3>
          </div>
        </div>

        <div className="suggesion">
          <h2 className="tools">Recommend Jobs</h2>

          <div className="still">
            <div className="head">
              <h3>🌐</h3>
              <h3>Frontend Developer</h3>
              <p>Tech Solutions</p>
              <p>Remote</p>
              <p>4-6 LPA</p>
              <button onClick={handlejob}>Apply</button>
            </div>

            <div className="head">
              <h3>🤖</h3>
              <h3>Python Developer</h3>
              <p>Code Studio</p>
              <p>Raipur</p>
              <p>3-5 LPA</p>
              <button onClick={handlejob}>Apply</button>
            </div>

            <div className="head">
              <h3>📊</h3>
              <h3>Data Analyst</h3>
              <p>Bright Analyst</p>
              <p>Remote</p>
              <p>4-7 LPA</p>
              <button onClick={handlejob}>Apply</button>
            </div>

            <div className="head">
              <h3>🧑‍🎨</h3>
              <h3>UI/UX Designer</h3>
              <p>Creative Minds</p>
              <p>Bangalore</p>
              <p>5-8 LPA</p>
              <button onClick={handlejob}>Apply</button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (screen === "contact") {
    return (
      <div className="contact-page">
        <h1>Contact Us</h1>
        <p>Feel free to contact me for any queries.</p>

        <div className="contact-card">
          <h2>My Details</h2>

          <p>👤 <strong>Name:</strong>Sakshi Singh</p>
          <p>📧 <strong>Email:</strong>Sakshisingh25@navgurukul.org</p>
          <p>📞 <strong>Phone:</strong> 7828147188</p>
          <p>📍 <strong>Location:</strong> Raigarh (C.G),India</p>
          <p>💼 <strong>Role:</strong> Jobify Developer</p>
          <p>🌐 <strong>Website:</strong> Jobify</p>
        </div>

        <button
          className="back-btn"
          onClick={() => setScreen("Home")}
        >
          ← Back
        </button>
      </div>
    )
  }
  else if (screen === "applications") {
    const applications = [
      {
        id: 1,
        role: "Frontend Developer",
        company: "Tech Solutions",
        location: "Remote",
        date: "15 Oct 2026",
        status: "Under Review",
        icon: "🌐",
        color: "blue"
      }, {
        id: 2,
        role: "Python Developer",
        company: "Code Studio",
        location: "Raipur",
        date: "12 Oct 2026",
        status: "Shortlisted",
        icon: "🐍",
      },
      {
        id: 3,
        role: "Data Analyst",
        company: "Bright Analyst",
        location: "Remote",
        date: "10 Oct 2026",
        status: "Pending",
        icon: "📊",
      },
      {
        id: 4,
        role: "UI/UX Designer",
        company: "Creative Minds",
        location: "Bangalore",
        date: "08 Oct 2026",
        status: "Rejected",
        icon: "🎨",
      },

    ];

    return (
      <div className="applications-page">
        <h1>My Applications 📋</h1>

        {applications.map((app) => (
          <div className="application-card" key={app.id}>
            <h2>{app.icon} {app.role}</h2>
            <p>Company: {app.company}</p>
            <p>Location: {app.location}</p>
            <p>Status: {app.status}</p>
          </div>
        ))}

        <button className="help" onClick={() => setScreen("Home")}>
          ← Back to Home
        </button>
      </div>
    );
  }
  else if (screen === "findJobs") {
    const jobs = [
      {
        id: 1,
        icon: "🌐",
        title: "Frontend Developer",
        company: "Google",
        location: "Bangalore / Hybrid",
        salary: "₹6–12 LPA",
        type: "Full-time",
        skills: "HTML, CSS, JavaScript, React",
      },
      {
        id: 2,
        icon: "⚛️",
        title: "React Developer",
        company: "Google",
        location: "Bangalore",
        salary: "₹8–15 LPA",
        type: "Full-time",
        skills: "React, TypeScript, APIs",
      },
      {
        id: 3,
        icon: "🐍",
        title: "Python Developer",
        company: "Google",
        location: "Remote / Hybrid",
        salary: "₹7–14 LPA",
        type: "Full-time",
        skills: "Python, SQL, Git",
      },
      {
        id: 4,
        icon: "📊",
        title: "Data Analyst",
        company: "Google",
        location: "Bangalore",
        salary: "₹5–10 LPA",
        type: "Full-time",
        skills: "Python, SQL, Data Visualization",
      },
    ]
    return (
      <div className="find-jobs-page">
        <header className="find-jobs-header">
          <button
            className="application-back"
            onClick={() => setScreen("Home")}
          >
            ← Back to Home
          </button>

          <p className="applications-label">JOBIFY CAREER EXPLORER</p>
          <h1>Find Your Next Developer Job 💻</h1>
          <p>Explore technology opportunities and grow your career.</p>
        </header>

        <div className="find-jobs-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search developer jobs..."
            id="job-search"
            onChange={(e) => {
              const input = e.target.value.toLowerCase()
              document.querySelectorAll(".find-job-card").forEach((card) => {
                const text = card.textContent?.toLowerCase() || ""
                  ; (card as HTMLElement).style.display =
                    text.includes(input) ? "flex" : "none"
              })
            }}
          />
        </div>

        <div className="find-jobs-heading">
          <h2>Developer Opportunities</h2>
          <span>{jobs.length} listings</span>
        </div>

        <div className="find-jobs-list">
          {jobs.map((job) => (
            <div className="find-job-card" key={job.id}>
              <div className="find-job-icon">{job.icon}</div>

              <div className="find-job-details">
                <h3>{job.title}</h3>
                <p className="find-job-company">{job.company}</p>
                <p>📍 {job.location}</p>
                <p>💰 {job.salary} · {job.type}</p>
                <p className="find-job-skills">
                  Skills: {job.skills}
                </p>
              </div>

              <button
                className="find-job-apply"
                onClick={maintain}
              >
                Apply Now →
              </button>
            </div>
          ))}
        </div>

        <p className="find-jobs-note">
          💡 These are sample listings for your project, not verified live vacancies.
        </p>
      </div>
    )
  }
  else if (screen === "Apply") {
    return (
      <div className="frontend-details-page">
        <div className="apply-page">
          <nav className="apply-navbar">
            <h2>💼 Jobify</h2>
            <span>Find your next opportunity</span>
          </nav>

          <div className="apply-container">
            <button
              className="apply-back"
              onClick={() => setScreen("Home")}
            >
              ← Back to Job Details
            </button>

            <div className="apply-banner">
              <div>
                <span className="apply-tag">JOB APPLICATION</span>
                <h1>Your next opportunity starts here!</h1>
                <p>
                  Tell us about yourself and take the next step
                  in your career.
                </p>
              </div>
              <div className="apply-illustration">🚀</div>
            </div>

            <form
              className="apply-form"
              onSubmit={(e) => {
                e.preventDefault()
                alert("Your application has been submitted successfully!")
                setScreen("applications")
              }}
            >
              <div className="apply-section-heading">
                <span>01</span>
                <div>
                  <h2>Personal Information</h2>
                  <p>How can the employer contact you?</p>
                </div>
              </div>

              <div className="apply-grid">
                <div className="apply-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label>Current Location *</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>

              <div className="apply-divider" />

              <div className="apply-section-heading">
                <span>02</span>
                <div>
                  <h2>Education & Experience</h2>
                  <p>Help the employer understand your background.</p>
                </div>
              </div>

              <div className="apply-grid">
                <div className="apply-field">
                  <label>Current Status *</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select your status</option>
                    <option>Currently Studying</option>
                    <option>Fresher / Recent Graduate</option>
                    <option>Currently Employed</option>
                    <option>Currently Unemployed</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="apply-field">
                  <label>Highest Qualification *</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select qualification</option>
                    <option>Class 12</option>
                    <option>Diploma</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="apply-field full-width">
                  <label>Skills *</label>
                  <input
                    type="text"
                    placeholder="e.g. HTML, CSS, JavaScript, React"
                    required
                  />
                </div>

                <div className="apply-field full-width">
                  <label>Projects or Work Experience</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about projects, internships, or previous work..."
                  />
                </div>
              </div>

              <div className="apply-divider" />

              <div className="apply-section-heading">
                <span>03</span>
                <div>
                  <h2>Why should we consider you?</h2>
                  <p>Share your motivation and career goals.</p>
                </div>
              </div>

              <div className="apply-field">
                <label>Why are you interested in this job? *</label>
                <textarea
                  rows={4}
                  placeholder="Explain why you want this role and what you can contribute..."
                  required
                />
              </div>

              <div className="apply-field">
                <label>What makes you a good fit for this role? *</label>
                <textarea
                  rows={4}
                  placeholder="Describe your strengths, skills, and what you hope to learn..."
                  required
                />
              </div>

              <div className="apply-divider" />


              <div className="apply-section-heading">
                <span>04</span>
                <div>
                  <h2>Upload Your Resume</h2>
                  <p>Let your skills and experience speak for you.</p>
                </div>
              </div>

              <label className="apply-upload">
                <span className="apply-upload-icon">📄</span>
                <strong>Choose your resume</strong>
                <span>PDF, DOC, or DOCX (Max 10 MB)</span>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];

                    if (file && file.size > 10 * 1024 * 1024) {
                      setError("File size must be 10 MB or less.");
                      setResume(null);
                      e.currentTarget.value = "";
                      return;
                    }

                    setError("");
                    setResume(file ?? null);
                  }}
                />
              </label>

              {error && <p className="error-message">{error}</p>}

              <label className="apply-consent">
                <input type="checkbox" required />
                <span>
                  I confirm that the information provided is accurate
                  and agree to its use for this job application.
                </span>
              </label>

              <button className="apply-submit" type="submit">
                Submit Application <span>→</span>
              </button>

              <p className="apply-footer-note">
                💙 Every opportunity is a chance to grow. Good luck!
              </p>
            </form>
          </div>
        </div>
      </div >
    )
  }
}
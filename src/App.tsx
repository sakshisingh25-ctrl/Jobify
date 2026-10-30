
import { useState, type FormEvent } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  description: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    salary: "₹3–6 LPA",
    category: "Technology",
    type: "Full-time",
    description: "Build responsive websites using HTML, CSS and JavaScript.",
  },
  {
    id: 2,
    title: "React Developer",
    company: "WebSpark",
    location: "Bengaluru",
    salary: "₹4–8 LPA",
    category: "Technology",
    type: "Full-time",
    description: "Develop modern user interfaces with React.",
  },
  {
    id: 3,
    title: "Accountant",
    company: "FinEdge",
    location: "Raipur",
    salary: "₹2–4 LPA",
    category: "Finance",
    type: "Full-time",
    description: "Maintain financial records, invoices and reports.",
  },
  {
    id: 4,
    title: "Digital Marketing Intern",
    company: "GrowthHub",
    location: "Remote",
    salary: "₹10,000–15,000/month",
    category: "Marketing",
    type: "Internship",
    description: "Support social media campaigns and digital marketing.",
  },
  {
    id: 5,
    title: "HR Executive",
    company: "PeopleFirst",
    location: "Delhi",
    salary: "₹3–5 LPA",
    category: "Human Resources",
    type: "Full-time",
    description: "Assist with recruitment and employee coordination.",
  },
  {
    id: 6,
    title: "Data Analyst Intern",
    company: "DataBridge",
    location: "Remote",
    salary: "₹12,000/month",
    category: "Technology",
    type: "Internship",
    description: "Analyze data using spreadsheets and visualization tools.",
  },
];

const categories = [
  { name: "Technology", icon: "💻", description: "Development, IT and data" },
  { name: "Finance", icon: "📊", description: "Accounting and banking" },
  { name: "Marketing", icon: "📣", description: "Marketing and creative roles" },
  { name: "Human Resources", icon: "🤝", description: "People and recruitment" },
];

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  education: "",
  experience: "",
  message: "",
};

type ApplicationForm = typeof initialForm;

export default function App() {
  const [page, setPage] = useState("Home");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [user, setUser] = useState(
    () => localStorage.getItem("jobifyUser") || ""
  );
  const [showAccount, setShowAccount] = useState(false);
  const [authMode, setAuthMode] = useState<"Login" | "Register">("Login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [application, setApplication] =
    useState<ApplicationForm>(initialForm);
  const [notice, setNotice] = useState("");
  const [applications, setApplications] = useState<string[]>([]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      `${job.title} ${job.company} ${job.category} ${job.location}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      !selectedCategory || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function navigate(nextPage: string) {
    setPage(nextPage);
    setNotice("");
    setShowAccount(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openApplication(job: Job) {
    setSelectedJob(job);
    setApplication(initialForm);
    setNotice("");
    navigate("Apply");
  }

  function updateApplication(
    field: keyof ApplicationForm,
    value: string
  ) {
    setApplication((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    if (!/^[A-Za-z ]{2,50}$/.test(authName.trim())) {
      setNotice("Enter a name using letters and spaces only.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail.trim())) {
      setNotice("Please enter a valid email address.");
      return;
    }

    if (authPassword.length < 6) {
      setNotice("Password must contain at least 6 characters.");
      return;
    }

    const savedEmail = localStorage.getItem("jobifyEmail");

    if (authMode === "Login" && savedEmail && savedEmail !== authEmail.trim()) {
      setNotice(
        "This demo remembers one account in this browser. Register again or use the saved account."
      );
      return;
    }

    localStorage.setItem("jobifyUser", authName.trim());
    localStorage.setItem("jobifyEmail", authEmail.trim());
    setUser(authName.trim());
    setAuthName("");
    setAuthEmail("");
    setAuthPassword("");
    setNotice("Welcome to Jobify!");

    navigate("Home");
  }

  function logout() {
    localStorage.removeItem("jobifyUser");
    localStorage.removeItem("jobifyEmail");
    setUser("");
    setShowAccount(false);
    setNotice("You have logged out.");
    navigate("Home");
  }

  function handleApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    if (!selectedJob) {
      setNotice("Please select a job first.");
      return;
    }

    if (!/^[A-Za-z ]{2,50}$/.test(application.name.trim())) {
      setNotice("Name must contain letters and spaces only.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email.trim())) {
      setNotice("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(application.mobile.trim())) {
      setNotice("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!application.education.trim()) {
      setNotice("Please enter your education.");
      return;
    }

    const applicationRecord = {
      job: selectedJob.title,
      name: application.name.trim(),
      email: application.email.trim(),
      mobile: application.mobile.trim(),
      education: application.education.trim(),
      experience: application.experience,
      message: application.message.trim(),
    };

    const savedApplications = JSON.parse(
      localStorage.getItem("jobifyApplications") || "[]"
    );

    savedApplications.push(applicationRecord);
    localStorage.setItem(
      "jobifyApplications",
      JSON.stringify(savedApplications)
    );

    setApplications((previous) => [...previous, selectedJob.title]);
    setApplication(initialForm);
    setNotice("Your application has been saved in this browser.");
    setPage("My Applications");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[A-Za-z ]{2,50}$/.test(contact.name.trim())) {
      setNotice("Enter a valid name using letters and spaces.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      setNotice("Please enter a valid email address.");
      return;
    }

    if (contact.message.trim().length < 10) {
      setNotice("Please write a message of at least 10 characters.");
      return;
    }

    setNotice(
      "Thank you for contacting Jobify! This demo does not send messages to a server."
    );
    setContact({ name: "", email: "", message: "" });
  }

  function showCategory(category: string) {
    setSelectedCategory(category);
    setSearch("");
    navigate("Jobs");
  }

  return (
    <div className="jobify">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; background: #f8fafc; }
        button, input, textarea, select { font: inherit; }
        button { cursor: pointer; }
        .jobify {
          min-height: 100vh;
          color: #182230;
          font-family: 'DM Sans', sans-serif;
          background: #f8fafc;
        }
        .topbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 18px; padding: 16px 6%;
          background: white; border-bottom: 1px solid #e8edf4;
          position: sticky; top: 0; z-index: 5;
        }
        .brand {
          border: 0; background: transparent; color: #5145cd;
          font: 800 28px 'Manrope', sans-serif; letter-spacing: -1.5px;
        }
        .brand span { color: #172033; }
        .navlinks { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .navlinks button {
          border: 0; background: transparent; color: #566174;
          padding: 10px 12px; border-radius: 9px; font-weight: 600;
        }
        .navlinks button:hover { color: #5145cd; background: #f1f0ff; }
        .primary, .secondary {
          border: 0; border-radius: 10px; padding: 12px 18px;
          font-weight: 700; transition: .2s;
        }
        .primary { background: #5145cd; color: white; }
        .primary:hover { background: #4035b0; transform: translateY(-1px); }
        .secondary { background: white; color: #5145cd; border: 1px solid #d9d6ff; }
        .secondary:hover { background: #f1f0ff; }
        .container { width: min(1120px, 90%); margin: 0 auto; }
        .hero {
          padding: 78px 0 70px;
          background: radial-gradient(circle at 85% 15%, #e7e5ff 0, transparent 32%),
                      linear-gradient(135deg, #f1f0ff, #fbfcff 68%);
        }
        .hero-grid { display: grid; grid-template-columns: 1.3fr .7fr; align-items: center; gap: 38px; }
        .eyebrow {
          display: inline-block; padding: 7px 12px; border-radius: 99px;
          background: #e5e3ff; color: #5145cd; font-size: 13px; font-weight: 700;
        }
        h1, h2, h3 { font-family: 'Manrope', sans-serif; }
        h1 { font-size: clamp(38px, 5.5vw, 62px); line-height: 1.12; letter-spacing: -2.5px; margin: 18px 0; }
        .accent { color: #5145cd; }
        .hero p { max-width: 570px; color: #667085; font-size: 17px; line-height: 1.8; }
        .hero-actions { display: flex; gap: 12px; margin-top: 26px; flex-wrap: wrap; }
        .hero-art {
          min-height: 290px; border-radius: 30px; background: white;
          box-shadow: 0 25px 70px #5145cd1a; padding: 28px;
          display: flex; flex-direction: column; justify-content: center; gap: 14px;
          border: 1px solid #eeedff;
        }
        .art-row {
          display: flex; align-items: center; gap: 13px; padding: 15px;
          border: 1px solid #edf0f6; border-radius: 15px; background: #fff;
        }
        .art-icon {
          width: 46px; height: 46px; border-radius: 13px;
          display: grid; place-items: center; font-size: 23px; background: #eeedff;
        }
        .muted { color: #778195; font-size: 13px; }
        .section { padding: 66px 0; }
        .section-head { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 26px; }
        .section-head h2 { margin: 0 0 8px; font-size: clamp(25px, 3vw, 34px); letter-spacing: -1px; }
        .section-head p { color: #778195; margin: 0; line-height: 1.6; }
        .category-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .category-card {
          text-align: left; background: white; border: 1px solid #e8edf4;
          padding: 22px; border-radius: 17px; transition: .2s; color: inherit;
        }
        .category-card:hover { border-color: #a9a2ff; box-shadow: 0 12px 28px #5145cd12; transform: translateY(-4px); }
        .category-icon { font-size: 29px; display: block; margin-bottom: 15px; }
        .category-card strong { display: block; font-size: 16px; margin-bottom: 8px; }
        .category-card small { color: #778195; line-height: 1.5; }
        .jobs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .job-card {
          background: white; border: 1px solid #e8edf4; border-radius: 17px;
          padding: 22px; display: flex; flex-direction: column; gap: 12px;
        }
        .job-card h3 { margin: 0; font-size: 19px; }
        .company { color: #667085; font-size: 14px; }
        .tag { display: inline-block; border-radius: 7px; padding: 6px 9px; background: #f0efff; color: #5145cd; font-size: 12px; font-weight: 700; margin-right: 6px; }
        .job-description { color: #667085; font-size: 14px; line-height: 1.6; flex: 1; }
        .job-meta { display: flex; justify-content: space-between; gap: 10px; color: #667085; font-size: 13px; flex-wrap: wrap; }
        .searchbar { display: flex; gap: 10px; margin-bottom: 24px; }
        .field {
          width: 100%; padding: 13px 14px; border: 1px solid #dce2eb;
          border-radius: 10px; background: white; color: #182230; outline: none;
        }
        .field:focus { border-color: #8278ee; box-shadow: 0 0 0 3px #5145cd15; }
        textarea.field { resize: vertical; min-height: 115px; }
        .form-card {
          max-width: 650px; margin: 0 auto; background: white;
          border: 1px solid #e8edf4; padding: 30px; border-radius: 20px;
          box-shadow: 0 14px 40px #17203308;
        }
        .form-card h2 { margin-top: 0; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
        .form-group label { font-size: 14px; font-weight: 700; }
        .full { grid-column: 1 / -1; }
        .notice { padding: 13px 15px; margin: 15px 0; border-radius: 10px; background: #eeedff; color: #4035a0; line-height: 1.5; }
        .account-box { background: white; border: 1px solid #e8edf4; padding: 22px; border-radius: 15px; }
        .empty { text-align: center; padding: 45px 20px; border: 1px dashed #ccd3e0; border-radius: 15px; color: #667085; background: white; }
        .contact-layout { display: grid; grid-template-columns: .8fr 1.2fr; gap: 28px; align-items: start; }
        .contact-info { background: #5145cd; color: white; border-radius: 20px; padding: 28px; }
        .contact-info p { line-height: 1.8; color: #e6e4ff; }
        .footer { background: #171d30; color: white; padding: 32px 6%; display: flex; justify-content: space-between; gap: 15px; flex-wrap: wrap; }
        .footer p { color: #b4bbcb; margin: 6px 0; }
        @media (max-width: 850px) {
          .hero-grid, .contact-layout { grid-template-columns: 1fr; }
          .category-grid { grid-template-columns: repeat(2, 1fr); }
          .jobs-grid { grid-template-columns: repeat(2, 1fr); }
          .topbar { align-items: flex-start; flex-direction: column; }
        }
        @media (max-width: 560px) {
          .jobs-grid, .category-grid, .form-grid { grid-template-columns: 1fr; }
          .full { grid-column: auto; }
          .hero { padding: 48px 0; }
          .hero-art { min-height: 220px; padding: 18px; }
          .section { padding: 45px 0; }
          .searchbar { flex-direction: column; }
          .form-card { padding: 21px; }
          .navlinks { gap: 3px; }
          .navlinks button { padding: 8px; }
        }
      `}</style>

      <header className="topbar">
        <button className="brand" onClick={() => navigate("Home")}>
          Job<span>ify</span>
        </button>

        <nav className="navlinks">
          {["Home", "Jobs", "Contact"].map((item) => (
            <button key={item} onClick={() => {
              if (item === "Jobs") setSelectedCategory("");
              navigate(item === "Contact" ? "Contact Us" : item);
            }}>
              {item === "Contact" ? "Contact Us" : item}
            </button>
          ))}

          {user && (
            <button onClick={() => navigate("My Applications")}>
              My Applications
            </button>
          )}

          {user ? (
            <button className="secondary" onClick={() => setShowAccount(!showAccount)}>
              👤 {user.split(" ")[0]} ▾
            </button>
          ) : (
            <button className="primary" onClick={() => {
              setAuthMode("Login");
              navigate("Login");
            }}>
              Login / Register
            </button>
          )}
        </nav>
      </header>

      {showAccount && user && (
        <div className="container" style={{ paddingTop: 15 }}>
          <div className="account-box">
            <strong>Welcome, {user}!</strong>
            <p className="muted">Your Jobify account</p>
            <button className="secondary" onClick={() => navigate("My Applications")}>
              View my applications
            </button>{" "}
            <button className="primary" onClick={logout}>Log out</button>
          </div>
        </div>
      )}

      {notice && (
        <div className="container">
          <div className="notice" role="status">{notice}</div>
        </div>
      )}

      {page === "Home" && (
        <>
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
                <h1>Find work that<br />makes you <span className="accent">grow.</span></h1>
                <p>
                  Discover opportunities that match your skills, explore new
                  career paths and take the next step towards your future.
                </p>
                <div className="hero-actions">
                  <button className="primary" onClick={() => {
                    setSelectedCategory("");
                    navigate("Jobs");
                  }}>Explore jobs →</button>
                  <button className="secondary" onClick={() => {
                    setAuthMode("Register");
                    navigate("Register");
                  }}>Create an account</button>
                </div>
              </div>

              <div className="hero-art">
                <div className="art-row">
                  <div className="art-icon">💻</div>
                  <div><strong>Frontend Developer</strong><div className="muted">TechNova · Remote</div></div>
                </div>
                <div className="art-row">
                  <div className="art-icon">📊</div>
                  <div><strong>Data Analyst Intern</strong><div className="muted">DataBridge · Remote</div></div>
                </div>
                <div className="art-row">
                  <div className="art-icon">✨</div>
                  <div><strong>Your next opportunity</strong><div className="muted">Start exploring today</div></div>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="section-head">
                <div>
                  <h2>Explore job categories</h2>
                  <p>Choose an area to discover matching opportunities.</p>
                </div>
              </div>
              <div className="category-grid">
                {categories.map((category) => (
                  <button
                    className="category-card"
                    key={category.name}
                    onClick={() => showCategory(category.name)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <strong>{category.name}</strong>
                    <small>{category.description}</small>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="section" style={{ background: "#f0f2f9" }}>
            <div className="container">
              <div className="section-head">
                <div>
                  <h2>Featured opportunities</h2>
                  <p>Explore a few roles to get your job search started.</p>
                </div>
                <button className="secondary" onClick={() => navigate("Jobs")}>View all jobs →</button>
              </div>
              <div className="jobs-grid">
                {jobs.slice(0, 3).map((job) => (
                  <JobCard key={job.id} job={job} onApply={openApplication} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {page === "Jobs" && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>{selectedCategory || "Find your next job"}</h2>
                <p>Search opportunities and apply for the role you want.</p>
              </div>
            </div>

            <div className="searchbar">
              <input
                className="field"
                placeholder="Search by job title, company or location..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button className="secondary" onClick={() => {
                setSearch("");
                setSelectedCategory("");
              }}>Clear filters</button>
            </div>

            <div className="category-grid" style={{ marginBottom: 25 }}>
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="category-card"
                  style={{
                    borderColor: selectedCategory === category.name ? "#5145cd" : undefined,
                    background: selectedCategory === category.name ? "#f1f0ff" : "white",
                  }}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.name ? "" : category.name
                  )}
                >
                  <strong>{category.icon} {category.name}</strong>
                  <small>{category.description}</small>
                </button>
              ))}
            </div>

            <p className="muted">{filteredJobs.length} job(s) found</p>

            {filteredJobs.length ? (
              <div className="jobs-grid">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={openApplication} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h3>No jobs found</h3>
                <p>Try another search or clear your category filter.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {page === "Apply" && selectedJob && (
        <section className="section">
          <div className="container">
            <div className="form-card">
              <button className="secondary" onClick={() => navigate("Jobs")}>← Back to jobs</button>
              <h2 style={{ marginTop: 24 }}>Apply for {selectedJob.title}</h2>
              <p className="muted">{selectedJob.company} · {selectedJob.location} · {selectedJob.salary}</p>

              <form onSubmit={handleApplication}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="app-name">Full name *</label>
                    <input id="app-name" className="field" required
                      value={application.name}
                      onChange={(e) => updateApplication("name", e.target.value)}
                      placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="app-email">Email address *</label>
                    <input id="app-email" className="field" type="email" required
                      value={application.email}
                      onChange={(e) => updateApplication("email", e.target.value)}
                      placeholder="you@example.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="app-mobile">Mobile number *</label>
                    <input id="app-mobile" className="field" type="tel" required
                      inputMode="numeric" maxLength={10}
                      value={application.mobile}
                      onChange={(e) => updateApplication("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="app-education">Education *</label>
                    <input id="app-education" className="field" required
                      value={application.education}
                      onChange={(e) => updateApplication("education", e.target.value)}
                      placeholder="e.g. B.Com final year" />
                  </div>
                  <div className="form-group full">
                    <label htmlFor="app-experience">Experience</label>
                    <select id="app-experience" className="field"
                      value={application.experience}
                      onChange={(e) => updateApplication("experience", e.target.value)}>
                      <option value="">Select experience</option>
                      <option value="Fresher">Fresher</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1–3 years">1–3 years</option>
                      <option value="3+ years">3+ years</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label htmlFor="app-message">Why are you suitable for this job?</label>
                    <textarea id="app-message" className="field"
                      value={application.message}
                      onChange={(e) => updateApplication("message", e.target.value)}
                      placeholder="Share your skills and interests..." />
                  </div>
                </div>
                <button className="primary" type="submit" style={{ width: "100%" }}>
                  Submit application
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {(page === "Login" || page === "Register") && (
        <section className="section">
          <div className="container">
            <div className="form-card">
              <h2>{authMode === "Login" ? "Welcome back" : "Create your Jobify account"}</h2>
              <p className="muted">Enter your details to continue.</p>

              <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                <button className={authMode === "Login" ? "primary" : "secondary"}
                  onClick={() => { setAuthMode("Login"); setNotice(""); }}>Login</button>
                <button className={authMode === "Register" ? "primary" : "secondary"}
                  onClick={() => { setAuthMode("Register"); setNotice(""); }}>Register</button>
              </div>

              <form onSubmit={handleAuth}>
                <div className="form-group">
                  <label htmlFor="auth-name">Full name *</label>
                  <input id="auth-name" className="field" required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value.replace(/[^A-Za-z ]/g, ""))}
                    placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="auth-email">Email address *</label>
                  <input id="auth-email" className="field" type="email" required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="auth-password">Password *</label>
                  <input id="auth-password" className="field" type="password"
                    minLength={6} required value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="At least 6 characters" />
                </div>
                <button type="submit" className="primary" style={{ width: "100%" }}>
                  {authMode === "Login" ? "Login" : "Create account"}
                </button>
              </form>
              <p className="muted" style={{ marginTop: 18 }}>
                Demo only: this account is stored in your browser, not verified by a server.
                Do not enter a real or reused password.
              </p>
            </div>
          </div>
        </section>
      )}

      {page === "My Applications" && (
        <section className="section">
          <div className="container">
            <h2>My Applications</h2>
            <p className="muted">Welcome, {user || "Guest"}.</p>
            {applications.length > 0 ? (
              <div className="jobs-grid">
                {applications.map((title, index) => (
                  <div className="job-card" key={`${title}-${index}`}>
                    <span className="tag">Application saved</span>
                    <h3>{title}</h3>
                    <p className="job-description">Your application has been saved in this browser.</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">
                <h3>No applications in this session</h3>
                <p>Explore jobs and submit an application to see it here.</p>
                <button className="primary" onClick={() => navigate("Jobs")}>Explore jobs</button>
              </div>
            )}
          </div>
        </section>
      )}

      {page === "Contact Us" && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Let's talk</h2>
                <p>Questions or feedback? We'd love to hear from you.</p>
              </div>
            </div>
            <div className="contact-layout">
              <div className="contact-info">
                <h2>Contact Jobify</h2>
                <p>We're here to help you make your next career move.</p>
                <p>💼 Career opportunities</p>
                <p>💬 Website feedback</p>
                <p>🤝 General questions</p>
                <p style={{ fontSize: 13 }}>
                  This demo contact form does not send email automatically.
                </p>
              </div>
              <div className="form-card">
                <h2>Send us a message</h2>
                <form onSubmit={handleContact}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Your name *</label>
                    <input id="contact-name" className="field" required
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      placeholder="Enter your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email address *</label>
                    <input id="contact-email" className="field" type="email" required
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="you@example.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">Message *</label>
                    <textarea id="contact-message" className="field" required
                      value={contact.message}
                      onChange={(e) => setContact({ ...contact, message: e.target.value })}
                      placeholder="How can we help you?" />
                  </div>
                  <button className="primary" type="submit" style={{ width: "100%" }}>
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div>
          <div className="brand" style={{ color: "white" }}>Job<span style={{ color: "#c5c0ff" }}>ify</span></div>
          <p>Helping you discover your next opportunity.</p>
        </div>
        <div>
          <p>© {new Date().getFullYear()} Jobify</p>
          <p>Built for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}

function JobCard({
  job,
  onApply,
}: {
  job: Job;
  onApply: (job: Job) => void;
}) {
  return (
    <article className="job-card">
      <span className="tag">{job.category}</span>
      <h3>{job.title}</h3>
      <div className="company">{job.company}</div>
      <p className="job-description">{job.description}</p>
      <div className="job-meta">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
      </div>
      <div>
        <span className="tag">{job.type}</span>
      </div>
      <button className="primary" onClick={() => onApply(job)}>
        Apply Now →
      </button>
    </article>
  );
}

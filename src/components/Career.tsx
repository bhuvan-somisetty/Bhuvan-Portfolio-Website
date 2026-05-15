import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Learning <span>&</span>
          <br /> Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>RGM International School</h4>
                <h5>Secondary Education</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed my Class 10 foundation with focus on academics,
              discipline, and early interest in technology.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Narayana Junior College</h4>
                <h5>Intermediate Education</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed Intermediate education with a strong base in
              problem-solving, logical thinking, and science fundamentals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Polaris School of Technology</h4>
                <h5>B.Tech CSE AI/ML</h5>
              </div>
              <h3 className="year-present">2025 – Present</h3>
            </div>
            <p>
              Currently pursuing B.Tech CSE AI/ML, building skills in software
              development, AI/ML, open source, backend systems, and real-world
              projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

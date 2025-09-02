import React from 'react';
import './DeveloperInfo.css';
import { FaFacebook, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const DeveloperInfo = () => {
  return (
    <div className="developer-info">
      <h2 className="developer-title">Meet the Developer</h2>
      <div className="developer-card">
        <div className="developer-avatar">
          <img src="https://avatars.githubusercontent.com/u/109292533?v=4" alt="Zahid Hasan Tonmoy" />
        </div>
        <div className="developer-details">
          <h3>Zahid Hasan Tonmoy</h3>
          <p>Senior Web Developer</p>
          <div className="developer-social">
            <a href="https://www.facebook.com/zahidhasantonmoybd" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.linkedin.com/in/zahidhasantonmoy/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://github.com/zahidhasantonmoy" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://zahidhasantonmoy.vercel.app" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfo;

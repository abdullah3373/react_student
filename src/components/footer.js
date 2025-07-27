// src/components/Footer.js
import React from 'react';
import '../styles/footer.css'; // We will create this CSS file later

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Abdullah. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
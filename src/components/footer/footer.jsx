import React, { Component } from "react";
import { FaHeart } from "react-icons/fa";

class Footer extends Component {
  render() {
    let footerStyle = { position: "absolute", width: "100%" };
    return (
      <footer className="footer mt-auto py-3 bg-light" style={footerStyle}>
        <div style={{ textAlign: "center" }}>
          MOOCer 2.0. Made with <FaHeart style={{ color: "#e25555" }} /> by
          Jayden Sun and Yuli Liu
        </div>
      </footer>
    );
  }
}

export default Footer;

import React, { Component } from "react";
import { Media, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./catalog-item.css";

class CatalogItem extends Component {
  render() {
    let captalize = (str) => {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    };
    let price = this.props.courseDetail.isFreeCourse === true ? " | Free" : " | Paid";
    let duration = this.props.courseDetail.duration ? " | " + this.props.courseDetail.duration : "";

    return (
      <Media className="course-card">
        <Image
          className="mr-3 course-image"
          src={this.props.courseDetail.image}
        />
        <Media.Body>
          <div className="provider">{captalize(this.props.courseDetail.platform)}</div>
          <h3><Link to={"/course/" + this.props.courseDetail._id} className="course-title">{this.props.courseDetail.title}</Link></h3>
          <p className="course-summary">
            {this.props.courseDetail.shortSummary}
          </p>
          <p className="course-meta">
            {captalize(this.props.courseDetail.level)} {duration} {price}
          </p>
          <div className="text-right">
          </div>
        </Media.Body>
      </Media>
    );
  }
}

export default CatalogItem;

import React, { Component } from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";

import "./lesson.css";

class Lessons extends Component {
  state = {};

  renderLessonData() {
    return this.props.lessonList.map((lesson, index) => {
      return (
        <TimelineItem
          key={index}
          dateText={"Lesson – " + index}
          dateInnerStyle={{ background: "#8ea6b2", color: "#f6f8fa" }}
        >
          <h3 style={{ color: "#1e383c" }}>{lesson.title}</h3>
          <p style={{ color: "#47646f" }}>{lesson.points}</p>
        </TimelineItem>
      );
    });
  }

  render() {
    return <Timeline lineColor={"#c3ccd3"}>{this.renderLessonData()}</Timeline>;
  }
}

export default Lessons;

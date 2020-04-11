import React, { Component } from "react";
import Profile from "../profile/profile";
import EditProfile from "../profile/edit-profile";
import { Route, Switch } from "react-router-dom";

class ProfileRoute extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route exact={true} path="/portfolio/" component={Profile} />
        <Route exact={true} path="/portfolio/edit" component={EditProfile} />
      </Switch>
    );
  }
}

export default ProfileRoute;

import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Button from "./Button";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { removeWindowRequest } from "../actions/windows";
import EditActionBar from './EditActionBar';

class ActionBar extends React.Component {
  render() {
    return (
      <div
        className={classNames("action-bar", {
          "action-bar--green": this.props.isInEditMode
        })}
      >
        <div className="action-bar-container">
          {this.props.isInEditMode && <EditActionBar windowId={this.props.windowId} />}
        </div>
        <div className="action-bar-container">
          <span className="action-bar__counter">{this.props.tabsCount}</span>
          <Button
            className="button button--small"
            title="Manage tabs in this window"
            icon={faEdit}
          />
          <Button
            className="button button--small"
            title="Close window with all tabs"
            icon={faTimes}
            handleClick={() => this.props.dispatch(removeWindowRequest(this.props.windowId))}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tabsCount: state.windows.find(({ id }) => id === props.windowId).tabs
      .length,
    isInEditMode: state.checkedTabs.some(({ windowId }) => {
      return windowId === props.windowId;
    }),
    checkedTabsInWindow: state.checkedTabs
      .filter(({ windowId }) => windowId === props.windowId)
      .map(({ id }) => id)
  };
};

export default connect(mapStateToProps)(ActionBar);

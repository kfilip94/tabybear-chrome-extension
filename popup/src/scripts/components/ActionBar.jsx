import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Button from "./Button";
import { faEdit, faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { removeWindowRequest } from "../actions/windows";
import EditActionBar from './EditActionBar';
import { selectWindow } from '../actions/checkedTabs';

class ActionBar extends React.Component {
  handleSelectAll = () => {
    this.props.dispatch(selectWindow(this.props.windowId, this.props.allTabsInWindows, this.props.tabsCount !== this.props.checkedTabs));
  };

  render() {
    return (
      <div
        className={classNames("action-bar", {
          "action-bar--green": this.props.isInEditMode
        })}
      >
        <div className="action-bar-container">
          <Button
            className="button button--small"
            title="Select all tabs in window"
            icon={faCheckCircle}
            handleClick={this.handleSelectAll}
          />
          {this.props.isInEditMode && <EditActionBar windowId={this.props.windowId} />}
        </div>
        <div className="action-bar-container">
          <span className="action-bar__counter">
            {
              this.props.isInEditMode ? `${this.props.checkedTabs}/${this.props.tabsCount}` : this.props.tabsCount
            }
          </span>
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
    allTabsInWindows: state.windows.find(({ id }) => id === props.windowId).tabs.map(({id}) => (id)),
    areAllWindowSelected: state.windows.find(({ id }) => id === props.windowId).tabs.length === state.checkedTabs.filter(({ windowId }) => windowId === props.windowId).length,
    checkedTabs: state.checkedTabs.filter(({ windowId }) => windowId === props.windowId).length

  };
};

export default connect(mapStateToProps)(ActionBar);

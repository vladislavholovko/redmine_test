import React, { Component } from "react";
import { withRouter } from "react-router";
//-------------
import "./issues.css";
import moment from "moment";
//-------------

class SpentTimeList extends Component {
  render() {
    let { ListSpentTime } = this.props;
    return (
      <div className="projectInfoAboutSomeIssueWrapper">
        {ListSpentTime.map(spentTime => (
          <div
            className="projectInfoAboutSomeIssueBlock"
            key={`spentTime_id:${spentTime.id}`}
          >
            <div className="someSpentTimeInfoAboutBlockId">
              Spent Time №: {spentTime.id}
            </div>
            <div className="projectInfoAboutSomeIssueBlockData">
              {moment(spentTime.created_on).format("YYYY-MM-DD HH:MM")}
            </div>

            {spentTime.user.name && (
              <div className="projectInfoAboutSomeIssueBlockUsers">
                <div>Author:</div>
                <div>{spentTime.user.name}</div>
              </div>
            )}

            {spentTime.hours && (
              <div className="projectInfoAboutSomeIssueBlockUsers">
                <div>Hours:</div>
                <div>{spentTime.hours}</div>
              </div>
            )}

            {spentTime.spent_on && (
              <div className="projectInfoAboutSomeIssueBlockUsers">
                <div>Spent on:</div>
                <div>{spentTime.spent_on}</div>
              </div>
            )}

            {spentTime.activity.name && (
              <div className="projectInfoAboutSomeIssueBlockUsers">
                <div>Activity name:</div>
                <div>{spentTime.activity.name}</div>
              </div>
            )}

            {spentTime.comment && (
              <div className="projectInfoAboutSomeIssueBlockSubject">
                <div>Comment:</div>
                <div>{spentTime.comment}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(SpentTimeList);

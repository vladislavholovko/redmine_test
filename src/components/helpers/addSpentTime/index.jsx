import React, { Component } from "react";
//-------------
import { toast } from "react-toastify";
import {
  Input,
  Modal,
  Button,
  TextArea,
  Select,
  Icon
} from "semantic-ui-react";
import "./spentTime.css";
//-------------
import NumberFormat from "react-number-format";
import DateTime from "../../helpers/datePicker";
//-------------
import * as TimeActions from "../../../actions/spentTimeActions";
//-------------
const activityList = [
  { value: "9", text: "Design" },
  { value: "10", text: "Development" },
  { value: "11", text: "Management" },
  { value: "12", text: "Testing" },
  { value: "13", text: "Automation QA" }
];
//-------------

class NewSpentTimeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      openModal: false,
      timeObject: {
        issue_id: "",
        project_id: "",
        spent_on: "",
        hours: "",
        activity_id: "",
        comments: ""
      },
      error: ""
    };
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  onChangeTimeObject = (type, value) => {
    this.setState({
      timeObject: {
        ...this.state.timeObject,
        [type]: value
      }
    });
  };

  onCreateSpentTime = async () => {
    let { timeObject } = this.state;
    let { issueId, projectId } = this.props;
    try {
      this.setState({ error: "" });
      if (!timeObject.spent_on) {
        this.setState({
          error: "Data value is required"
        });
        throw new Error("Data value is required");
      }

      if (!timeObject.hours) {
        this.setState({
          error: "Hours value is required"
        });
        throw new Error("Hours value is required");
      }

      if (!timeObject.activity_id) {
        this.setState({
          error: "Activity value is required"
        });
        throw new Error("Activity value is required");
      }

      if (issueId) {
        timeObject.issue_id = issueId;
        delete timeObject.project_id;
      }

      if (projectId) {
        timeObject.project_id = projectId;
        delete timeObject.issue_id;
      }

      await TimeActions.createSpentTime(timeObject);
    } catch (error) {
      this.setState({ loading: false });
      toast.error(error.message);
    }
  };

  render() {
    let { openModal, loading, timeObject, error } = this.state;
    let { issueId, projectId } = this.props;
    console.log("MODAL_TIME_STATE", this.state);

    return (
      <Modal
        trigger={
          <Button
            icon
            onClick={() => this.onOpenModal()}
            color="grey"
            circular
            labelPosition="right"
            size="mini"
          >
            Add time
            <Icon name="plus" />
          </Button>
        }
        open={openModal}
        onClose={() => this.onCloseModal()}
        dimmer="blurring"
      >
        <Modal.Header className="modal_header">ADD SPENT TIME</Modal.Header>
        <Modal.Content className="modal_content">
          <p className="modal_content_info">
            {issueId
              ? `ISSUE: ${issueId}`
              : projectId
              ? `PROJECT: ${projectId}`
              : ""}
          </p>
          {error && <p className="modal_content_error">{error}</p>}
          <div className="modal_content_block">
            <div className="modal_content_block_input">
              <label>Date</label>
              <DateTime
                onChangeDate={this.onChangeTimeObject}
                fieldName="spent_on"
                placeholder="Date"
                value={timeObject.spent_on}
              />
            </div>
            <div className="modal_content_block_input">
              <label>Hours</label>
              <NumberFormat
                fluid
                customInput={Input}
                placeholder="Hours"
                value={timeObject.hours}
                onValueChange={e => this.onChangeTimeObject("hours", e.value)}
              />
            </div>
            <div className="modal_content_block_input">
              <label>Activity</label>
              <Select
                fluid
                value={timeObject.activity_id}
                options={activityList}
                placeholder="Activity"
                onChange={(e, { value }) =>
                  this.onChangeTimeObject("activity_id", value)
                }
              />
            </div>
          </div>
          <div className="modal_content_block_input">
            <label>Comment</label>
            <TextArea
              fluid="true"
              placeholder="Comment"
              rows={5}
              value={timeObject.comments}
              onChange={(e, data) =>
                this.onChangeTimeObject("comments", data.value)
              }
            />
          </div>
        </Modal.Content>
        <Modal.Actions className="modal_button_segment">
          <Button
            disabled={loading}
            loading={loading}
            content="Cancel"
            onClick={() => this.onCloseModal()}
          />
          <Button
            primary
            disabled={loading}
            loading={loading}
            content="Send"
            onClick={() => this.onCreateSpentTime()}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NewSpentTimeModal;

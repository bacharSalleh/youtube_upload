import React from "react";
import "./App.css";
import axios from "axios";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

class App extends React.Component {
  state = { file: null, percent: 0, progress: false };

  onFileSelect = event => {
    console.log(event.target.files[0]);
    this.setState({ file: event.target.files[0] });
  };

  onFormSubmit = () => {
    const formData = new FormData();
    formData.append("myvideo", this.state.file);
    const config = {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        this.setState({ ...this.state, percent: percentCompleted });
        console.log(percentCompleted);
      },
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    this.toggleProgressCircle();
    axios
      .post("http://localhost:5000/upload", formData, config)
      .then(response => {
        setTimeout(this.toggleProgressCircle, 500);
      })
      .catch(error => {
        this.toggleProgressCircle();
        console.error(error);
      });
  };

  toggleProgressCircle = () => {
    this.setState({
      ...this.state,
      percent: 0,
      progress: !this.state.progress
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input
            type="file"
            name="myvideo"
            accept="video/mp4"
            onChange={this.onFileSelect}
          />
          <br />
          <button
            disabled={!this.state.file || this.state.progress ? true : false}
            className="btn btn-lg btn-primary"
            onClick={this.onFormSubmit}
          >
            Submit
          </button>
          <br />
          {this.state.progress ? (
            <Progress type="circle" width={70} percent={this.state.percent} />
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;

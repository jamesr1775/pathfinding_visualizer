import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import "./Header.css";

const algorithms = [
  { label: "Dijstra's Algorithm", value: 1 },
  { label: "Breadth First Search", value: 2 },
  { label: "A* Algorithm", value: 3 },
  { label: "Greedy Algorithm", value: 4 },
  // { label: "Depth First Search", value: 5 },
];
const patterns = [
  { label: "Basic Random Maze", value: 1 },
  { label: "Simple Stair Pattern", value: 2 },
  { label: "Recursive Maze Pattern", value: 3 },
];
export class Header extends Component {
  handleChangeAlgorithm = (e) => {
    this.props.selectAlgorithm(e.label);
  };
  handleChangeMaze = (e) => {
    this.props.selectMaze(e.label);
  };

  render() {
    return (
      <header>
        <h1 style={headerStyle}>
          <div className="container">
            <div className="row">
              <div className="dropdown" style={headerStyle}>
                Pathfinding Visualizer
              </div>
              <div className="dropdown">
                <Select
                  placeholder={"Select Algorithm"}
                  options={algorithms}
                  styles={dropDownStyles}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "teal",
                    },
                  })}
                  onChange={this.handleChangeAlgorithm}
                />
              </div>
              <div className="dropdown">
                <Select
                  placeholder={"Mazes & Patterns"}
                  options={patterns}
                  styles={dropDownStyles}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "teal",
                    },
                  })}
                  onChange={this.handleChangeMaze}
                />
              </div>
              <button style={buttonStyle} id="VisBtn" onClick={() => this.props.visualizeAlgorithm()}>
                Visualize
              </button>
              <button style={buttonStyle} onClick={() => this.props.getClearPath()}>
                Clear Path
              </button>
              <button style={buttonStyle} onClick={() => this.props.getClearWalls()}>
                Clear Walls
              </button>
              <button style={buttonStyle} onClick={() => this.props.getClearGrid()}>
                Clear Grid
              </button>
            </div>
          </div>
        </h1>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  selectAlgorithm: PropTypes.func.isRequired,
  selectMaze: PropTypes.func.isRequired,
  visualizeAlgorithm: PropTypes.func.isRequired,
  algorithm: PropTypes.object.isRequired,
  getClearPath: PropTypes.func.isRequired,
  getClearWalls: PropTypes.func.isRequired,
  getClearGrid: PropTypes.func.isRequired,
  grid: PropTypes.object.isRequired,
};

const headerStyle = {
  background: "#34495e",
  color: "#fff",
  fontSize: "24px",
  paddingTop: "3px",
};

const buttonStyle = {
  borderRadius: "4px",
  color: "black",
  textAlign: "center",
  fontSize: "18px",
  padding: "10px",
  display: "",
};

const dropDownStyles = {
  control: (base, state) => ({
    ...base,
    background: "#34495e",
    color: "#fff",
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    borderColor: state.isFocused ? "#34495e" : "#34495e",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      background: "teal",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "#34495e",
    color: "fff",
    padding: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: "#34495e",
    color: "fff",
    padding: 0,
  }),
  singleValue: (base) => ({
    ...base,
    background: "#34495e",
    color: "fff",
    padding: 0,
  }),
};

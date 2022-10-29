/* eslint-disable no-useless-constructor */
import React from "react";
import Button from "./Button";

class SingleChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  isActive(option, answer) {
    return option === answer;
  }

  render() {
    const { options, answer } = this.props;
    return (
      <>
        {options.map((option) => (
          <Button
            key={option}
            isActive={this.isActive(option, answer)}
            onClick={() => {
              this.props.onSelect(option);
            }}
          >
            {option}
          </Button>
        ))}
      </>
    );
  }
}

export default SingleChoice;

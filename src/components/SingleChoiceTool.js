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
    const { options, answer, addons } = this.props;
    const hasAddons = addons && addons.length === options.length;
    return (
      <>
        {options.map((option, i) => (
          <Button
            key={i}
            className="relative"
            isActive={this.isActive(option, answer)}
            onClick={() => {
              this.props.onSelect(option);
            }}
          >
            {option}
            {hasAddons && addons[i]}
          </Button>
        ))}
      </>
    );
  }
}

export default SingleChoice;

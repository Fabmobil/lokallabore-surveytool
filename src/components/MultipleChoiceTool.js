/* eslint-disable no-useless-constructor */
import React from "react";
import Button from "./Button";

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  toggle(answer, data) {
    const index = data.indexOf(answer);
    if (index > -1) {
      //remove
      data.splice(index, 1);
      this.props.onChange(data);
    } else {
      //add
      this.props.onChange([...data, answer]);
    }
  }

  isActive(answer, data) {
    if (!data) {
      return false;
    }
    return data.indexOf(answer) > -1;
  }

  render() {
    const { options } = this.props;
    const data = this.props.data || [];

    return (
      <>
        {options.map((option) => (
          <Button
            key={option}
            isActive={this.isActive(option, data)}
            onClick={() => {
              this.toggle(option, data);
            }}
          >
            {option}
          </Button>
        ))}
      </>
    );
  }
}

export default MultipleChoice;

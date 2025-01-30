import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

class ShoppingCartButton extends React.Component {
  state = { counter: this.props.counter };

  handleIncrement = () => {
    this.setState({ ...this.state.counter++ }, this.props.updateCounter(this.state.counter));
  };

  handleDecrement = () => {
    this.setState({ ...this.state.counter-- }, this.props.updateCounter(this.state.counter));
  };

  render() {
    const displayCounter = this.state.counter > 0;
    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={this.handleIncrement} 
        sx={{width: !displayCounter? 120: 20}}>{!displayCounter? <AddShoppingCartIcon/>: '+' }</Button>
        {displayCounter && <Button disabled>{this.state.counter}</Button>}
        {displayCounter && <Button onClick={this.handleDecrement}>-</Button>}
      </ButtonGroup>
    );
  }
}

export default ShoppingCartButton;
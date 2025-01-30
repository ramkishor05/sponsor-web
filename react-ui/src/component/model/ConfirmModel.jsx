import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ConfirmModel extends React.Component {

  render() {
    const { title, data , message, type} = this.props;
    return (
      <div>
        <Dialog
          open={this.props.openAction}
          onClose={this.props.closeAction}
          aria-labelledby="form-dialog-title"

        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeAction} color="primary">
              Disagree
            </Button>
            <Button onClick={(event)=>this.props.saveAction(type, data)} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
// imports the React Javascript Library
import React from "react";

import defaultImg from '../../assets/images/product/no-image.svg'

//Tabs
import { withStyles } from "@material-ui/styles";
import { UploadFileOutlined } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: "100%",
    textAlign: 'center'
  },
  input: {
    display: "none"
  },
  img: {
    margin: "0",
    padding: 0,
    position: 'relative',
    border: '10px',
    textAlign: 'center'
  },
  btn : {
    position: "relative",
    backgroundColor: 'rgb(157 140 201 / 50%)',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '20px',
    textAlign: 'center'
  }
});

class ImageUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial
    imageUploaded: 0,
    bytes: '',
    selectedFile: this.props.image,
    btn: false
  };

  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      /*GlobalResourceService.add(this.props.container+"/"+file.name, reader.result).then(url=>{
       
        this.setState({
          selectedFile: url
        },this.props.setUserProfileImge(url));
        
      });*/
      this.setState({
        selectedFile: reader.result
      },this.props.setImage({fileContent: reader.result, fileName: file.name, fileType: file.type, folderName: this.props.container }));
    }.bind(this);
     // Would see a path?

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
    
  };

  srcUrl=(selectedFile)=>{
    if(selectedFile){
      return selectedFile;
    }
    return defaultImg;
  }

  renderInitialState() {
    const { classes, height, label } = this.props;
    return (
        <>
        <img
          {...this.props}
          className={classes.img}
          src={this.srcUrl(this.state.selectedFile)}
          onMouseOver={()=> this.setState({btn: true})}
          fullWidth
        />
        {this.state.btn &&
      <label htmlFor={label}>
        <span 
            onMouseOut={()=> this.setState({btn: true})}>
          <UploadFileOutlined></UploadFileOutlined>
          {label}
          <input
            accept="image/*"
            className={classes.input}
            id={label}
            multiple
            type="file"
            onChange={this.handleUploadClick}
          />
        </span>
      </label>}
      </>
    );
  }

  renderUploadedState() {
    const { classes, height, label} = this.props;

    return (
      <>
      
        <img
          {...this.props}
          className={classes.img}
          src={this.state.selectedFile}
          onMouseOver={()=> this.setState({btn: true})}
        />
        {this.state.btn &&
      <label htmlFor={label}>
        <span 
            onMouseOut={()=> this.setState({btn: true})}>
          <UploadFileOutlined fullWidth>{label}</UploadFileOutlined>
          {label}
          <input
            accept="image/*"
            className={classes.input}
            id={label}
            type="file"
            onChange={this.handleUploadClick}
          />
        </span>
      </label>
      }
     </>
    );
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
          {(this.state.mainState == "initial" && this.renderInitialState()) ||
            (this.state.mainState == "uploaded" && this.renderUploadedState())}
        
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);

// imports the React Javascript Library
import React from "react";

import defaultImg from '../../assets/images/product/no-image.svg'

//Tabs
import { withStyles } from "@material-ui/styles";
import { UploadFileOutlined } from "@material-ui/icons";
import ImageUploadCard from "./ImageUploadCard";
import { Grid } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: "100%",
    margin: "0",
    padding: 0,
  },
  input: {
    display: "none"
  },
  video: {
    width: '200px',
    height: '140px',
    margin: "0",
    padding: 0,
    maxWidth: "200px",
    minWidth: "140px",
    position: 'relative',
    border: '10px'
  },
  btn : {
    position: "absolute",
    transform: 'translate( -111%,-202%)',
    backgroundColor: 'rgb(157 140 201 / 50%)',
    color: 'white',
    fontSize: '16px',
    padding: '7px 70px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '20px',
    textAlign: 'center'
  }
});

class VideoUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial
    imageUploaded: 0,
    bytes: '',
    selectedFile: this.props.video,
    btn: true,
    fileObject: {
      posterContent:this.props.poster
    }
  };

  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
        var fileObject= {
            ...this.state.fileObject,
            fileContent: reader.result, 
            fileName: file.name, fileType: 
            file.type, folderName: this.props.container 
        };
        this.setState({
          selectedFile: reader.result,
          fileObject : fileObject
        },
        this.props.setVideo(fileObject));
    }.bind(this);
     // Would see a path?

    this.setState({
      ...this.state,
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,

    });
    
  };

  srcUrl=(selectedFile)=>{
    if(selectedFile){
      return selectedFile;
    }
    return defaultImg;
  }

  renderInitialState() {
    const { classes, height, width } = this.props;
    return (
     <Grid container spacing={2}  fullWidth>
       <Grid item > 
          <video
             // width={width}
              src={this.srcUrl(this.state.selectedFile)} 
             // height={height} 
               className={classes.video}
               poster={this.state.fileObject.posterContent}
              controls>
            <source  src={this.srcUrl(this.state.selectedFile)}  />
            Your browser does not support the video tag.
          </video>
      
          {this.state.btn &&
          <label htmlFor="video-file">
            <span className={classes.btn}
                onMouseOut={()=> this.setState({btn: true})}>
              <UploadFileOutlined></UploadFileOutlined>
              <input
                accept={this.props.accept? this.props.accept: "video/*"}
                className={classes.input}
                id="video-file"
                multiple
                type="file"
                onChange={this.handleUploadClick}
              />
            </span>
          </label>
          }
      </Grid>
      <Grid item >
      <ImageUploadCard name={"posterName"}
        container={"poster"}
        image={this.state.fileObject.posterContent} 
        setImage={(value)=> {
          this.setState({
            ...this.state,
            fileObject: {
            ...this.state.fileObject,
            posterName: value.fileName,
            posterContent: value.fileContent
          }});
          this.props.setVideo(this.state.fileObject);
   } }
        >
      </ImageUploadCard>
     </Grid>
     </Grid>
     
    );
  }

  renderUploadedState() {
    const { classes, height, width } = this.props;

    return (
      <Grid container>
       <Grid item sx={6}> 
          <video 
              //width={width} 
              src={this.state.selectedFile}
              poster={this.state.fileObject.posterContent}

             // height={height}  
             className={classes.video}
             fullWidth
              controls>
            <source  src={this.state.selectedFile}/>
            Your browser does not support the video tag.
          </video>
          {this.state.btn &&
          <label htmlFor="video-file">
            <span className={classes.btn} 
                onMouseOut={()=> this.setState({btn: true})}>
              <UploadFileOutlined fullWidth></UploadFileOutlined>
              <input
                accept={this.props.accept? this.props.accept: "video/*"}
                className={classes.input}
                id="video-file"
                type="file"
                onChange={this.handleUploadClick}
              />
            </span>
          </label>
          }
     </Grid>
     <Grid item sx={6}> 
        <ImageUploadCard name={"posterName"}
              container={"poster"}
              image={this.state.fileObject.posterContent} 
              setImage={(value)=> {
                this.setState({
                  ...this.state,
                  fileObject: {
                  ...this.state.fileObject,
                  posterName: value.fileName,
                  posterContent: value.fileContent
                }})
                this.props.setVideo(this.state.fileObject);
              }
                
              }
          >
          </ImageUploadCard>
        </Grid>
      </Grid>
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

export default withStyles(styles, { withTheme: true })(VideoUploadCard);

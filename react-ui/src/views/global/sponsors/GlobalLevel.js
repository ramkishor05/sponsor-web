import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import { ArrowBack } from '@material-ui/icons';

import Tree from "react-d3-tree";

import { getGlobalSponsorTree } 
from '../../../actions';
import { connect } from 'react-redux';

class GlobalLevel extends Component {
    state={
        data: [this.props.globalSponsorTree],
        queue :[]
    }
    
    clearAndRefresh = () => {
        this.props.getGlobalSponsorTree();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    
    clickOnNode=(node,event)=>{
        console.log("event ", node)
        this.state.queue.push(this.state.data.pop());
        this.setState({ ...this.state, data: [node.data]});
    }

    navigationBack=()=>{
        if(this.state.queue.length>0){
            let node=this.state.queue.pop();
            console.log("node=", node)
            this.setState({ ...this.state, data: [node]});
        }
    }

    render() {
        return (
            <>
                
                <MainCard title="Levels" 
                        content = {false}
                    >
                       <div style={{textAlign: 'center'}}>
                        <Button 
                            color="primary" 
                            onClick={this.navigationBack}>
                                <ArrowBack/>
                            </Button>
                        {
                        this.state.data && this.state.data.length>0 &&
                        <Tree 
                        data={this.state.data} 
                        rootNodeClassName="node__root"
                        branchNodeClassName="node__branch"
                        leafNodeClassName="node__leaf"
                        //  pathFunc={this.straightPathFunc}
                        pathClassFunc={this.getDynamicPathClass}
                        orientation={"vertical"}
                        position={"relative"}
                        translate={{x:window.screenX+(window.innerWidth/2.6), y: window.screenY+50}}
                        collapsible={false}
                        onNodeClick= {this.clickOnNode}
                        />
                       }
                       </div>
                    </MainCard>
                    
            </>
        );
    };
}



const mapStateToProps = state => {

    const { globalSponsorTree } = state.globalSponsorReducer;

    return { globalSponsorTree };
};


export default connect(mapStateToProps, { getGlobalSponsorTree })(GlobalLevel);



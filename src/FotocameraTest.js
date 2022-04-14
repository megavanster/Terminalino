import React, {Component} from 'react';
import { Camera, FACING_MODES } from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';


class FotocameraTest extends Component {
    constructor(props){
        super(props);
        this.state = { dataUri: null };
    }

    handleTakePhoto (dataUri) {
        this.setState( { dataUri: dataUri });
    }
    

    render (){
        return (
            <>
                <div className="App">
                    <Camera
                        idealFacingMode={FACING_MODES.ENVIRONMENT}
                        isImageMirror={false}
                        isFullScreen={true}
                        isMaxResolution={true}                  
                        sizeFactor={1}
                        onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                    />
                    <Anteprima dataUri={ this.state.dataUri } />
                </div>
            </>
        );
    }
}

class Anteprima extends Component {
    
    render() {
        if (this.props.dataUri === null) return(<></>);
        return (
            <div className='container p-4'>
                <img src={this.props.dataUri} className="img-fluid" />
            </div>
            
        )
    }
}


export default FotocameraTest;
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Menu extends Component {
    render (){       

        return (
            <div className="container-fluid m-3" >                
                    { this.props.comandi.map( comando => (<BtnMenu 
                                                                key= {comando.cmd}
                                                                comando= {comando} 
                                                                onClickBtnMenu={this.props.onClickBtn}
                                                          />) ) }            
            </div>
        );
    }
}

class BtnMenu extends Component {    
    render (){
        return(
            <button className="btn btn-secondary m-2" style={ {width: 180, height: 180} } onClick={ () => this.props.onClickBtnMenu( this.props.comando.cmd )} >
                <h2>
                    { this.props.comando.nome }
                </h2>                
            </button>
        );
    };
}

export default Menu;
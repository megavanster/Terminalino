import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

/*
08/04/2022  canovam     
Questo componente gestisce la barra del titolo.
Ha 3 parametri:
    - titolo: Testo che compare al centro della barra
    - onClickBtnBarraTitolo: Evento al click pulsante        
*/

class BarraTitolo01 extends Component {

    render() {        
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">                    
                    <button onClick={ this.props.onClickBtn } className="btn btn-outline-light">
                        <img src='./../arrow-89-24.png' alt="" width="30" height="24" className="d-inline-block align-text-top" />
                    </button>                    
                    <label className="navbar-brand">{ this.props.titolo }</label>                    
                </div>
            </nav>
        );
    }
}

export default BarraTitolo01;
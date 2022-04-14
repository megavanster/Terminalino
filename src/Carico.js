import React, {Component} from 'react';
import Griglia01 from './components/Griglia01';

class Carico extends Component {

    constructor(props) {
        super(props);
        this.state = { stato: 1, collo: '', cella: '', messaggio: '', contenuto: [{}] };   
        
        this.onChangeCollo = this.onChangeCollo.bind( this );
        this.onChangeCella = this.onChangeCella.bind( this );
        this.onBlurCollo = this.onBlurCollo.bind( this );
        this.onBlurCella = this.onBlurCella.bind( this );
        this.onClickRicomincia = this.onClickRicomincia.bind( this );
    }    

    onChangeCollo( idCollo ) {        
        this.setState({ collo: idCollo });     
    }

    onBlurCollo( idCollo ) {
        this.setState({ collo: idCollo });  
        const fields = { collo: idCollo, altro: 2 };
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('http://nov-sv01:3005/check_collo', {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(fields)                                  
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {                                                
                let msg = (data[0]);                
                this.setState( {messaggio: msg.messaggio, contenuto: msg.contenuto });
                if ( msg.esito === 'Y' )
                    this.setState( { stato: 2 });
            })
            .catch( (err) => {
                console.log("Errore");
                console.log(err);
            });        
    }

    onChangeCella( idCella ) {        
        this.setState({ cella: idCella });        
    }

    onBlurCella( idCella ) {
        this.setState({ cella: idCella });               
        const fields = { cella: idCella, altro: 2 };
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('http://nov-sv01:3005/check_cella', {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(fields)                                  
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {                                                
                let msg = (data[0]);
                this.setState( {messaggio: msg.messaggio });
                if ( msg.esito === 'Y' )
                {
                    let msg_completo = msg.messaggio + 
                                        " Contenitore " + 
                                        this.state.collo + 
                                        " nella cella " +
                                        this.state.cella;
                    this.setState( { stato: 3 });
                    this.setState( {messaggio: msg_completo });
                }                    
            })
            .catch( (err) => {
                console.log("Errore");
                console.log(err);
            });         
    }   
    
    onClickRicomincia() {
        this.setState( { stato: 1, collo: '', cella: '', messaggio: '' } );        
    }

    Interfaccia_stato01() {
               
        return (            
            <div>
                <TxtChkNumber
                    tipo="collo"                     
                    descr="Inserisci il codice collo" 
                    valore={ this.state.collo }
                    onChangeTesto={ this.onChangeCollo }
                    onBlurTesto={ this.onBlurCollo }
                /> 
                <Messaggio messaggio={this.state.messaggio}/>                   
            </div>);
    }

    Interfaccia_stato02() {
        let colonneTab = [ 
            { col: 'codice', tipo: 'txt', label: 'Articolo'},
            { col: 'qta', tipo: 'num', label: 'Quantità'}
        ];
        let titolo_tab = "Contentuto del collo " + this.state.collo;
        return (
            <div>
                <TxtChkNumber  
                    tipo="cella"                       
                    descr="Inserisci il codice cella" 
                    valore={ this.state.cella }
                    onChangeTesto={ this.onChangeCella }
                    onBlurTesto={ this.onBlurCella }                        
                />
                <Messaggio messaggio={this.state.messaggio}/>                                 
                <Griglia01 
                        filtro={1} 
                        titolo={titolo_tab}
                        datiTab={this.state.contenuto}
                        colonneTab={colonneTab}
                />                 
            </div>); 
    }

    Interfaccia_stato03() {
        return (
            <div className='d-grid btn-lg mx-auto' style={{width: 400}}>
                <Messaggio messaggio={this.state.messaggio}/>
                <button className='btn btn-secondary btn-lg mx-3' onClick={this.onClickRicomincia}>
                    Ricomincia
                </button>
            </div>); 
    }    

    render() { 
        if (this.state.stato === 1)                           
            return this.Interfaccia_stato01();
        if (this.state.stato === 2)               
            return this.Interfaccia_stato02();                                         
        if (this.state.stato === 3)               
            return this.Interfaccia_stato03();            
    }
}

class Messaggio extends Component {
    render() {
        if ( this.props.messaggio === '' )
            return <label></label>;
        else
            return (
                <div className="alert alert-warning alert-dismissible " role="alert">
                    <p className='text-center'>{this.props.messaggio}</p>                
                </div>        
            );
    }
}

class TxtChkNumber extends Component {

    constructor(props) {
        super(props);
        this.onChangeTesto = this.onChangeTesto.bind( this );
        this.onBlurTesto = this.onBlurTesto.bind( this );
    }

    onChangeTesto(e) {
        this.props.onChangeTesto( e.target.value );
    }

    onBlurTesto(e){
        this.props.onBlurTesto(e.target.value );
    }  

    render() { 
            const testoRicerca = this.props.valore;
            // const nome_input = 'txtChkNumber_' + this.props.tipo;
            //    <input ref={input => input && input.focus()} className='input_txtChkNumber' type="number" value={testoRicerca} onChange={this.onChangeTesto} onBlur={this.onBlurTesto} ></input>            
            return (
                <div className='div_txtChkNumber'>
                    <label>{this.props.descr}</label>                    
                    <input autoFocus className='input_txtChkNumber' type="number" value={testoRicerca} onChange={this.onChangeTesto} onBlur={this.onBlurTesto} ></input>
                </div>
                
            );
        
    }
}


export default Carico;
import React, {Component} from 'react';

/* Griglia00
11/04/2022  canovam     
Questo componente gestisce una semplice griglia di visualizzazione.
Tramite colonneTab è possibile: 
    - impostare l'ordine delle tabelle; 
    - settare la visualizzazione (txt=testo, img=path immagine, num=numero );
    - settare un label diverso.
Ha 3 parametri:
    - titolo: titolo della tabella
    - filtro: 1 presente / 0 assente
    - datiTab: file json contenente i dati
    - colonneTab: elenco dei campi da visualizzare con realtive impostazioni    

    Esempio:
        let datiTab = [
            { utente: 'Filo', nome: 'Pippo', avatarUrl: '/download.png' },
            { utente: 'Pluto', nome: 'Pluto', avatarUrl: '/download.png' },
            { utente: 'Gianfranco', nome: 'Jan', avatarUrl: '/download1.png' }
            ];
        let colonneTab = [ 
            { col: 'utente', tipo: 'txt', label: 'User'}, 
            { col: 'nome', tipo: 'txt', label: 'Nome'},   
            { col: 'avatarUrl', tipo: 'img', label: 'Foto'},
            { col: 'patrimonio', tipo: 'num', label: 'Soldi' }  
            ];  

*/

class Griglia00 extends Component {
    constructor(props) {
        super(props);
        this.state = { testoRicerca: '' };      
        this.handleTestoRicercaChange = this.handleTestoRicercaChange.bind( this );
    }

    handleTestoRicercaChange(testoRicerca) {
        this.setState({ testoRicerca: testoRicerca });
      }    

    render() {        
        return (
            <>
                <div className='div_grid00'>
                    <Griglia00Titolo titolo={this.props.titolo}/>
                    <Griglia00Ricerca 
                        testoRicerca={this.state.testoRicerca}
                        onFilterTextChange={this.handleTestoRicercaChange}
                        filtro={this.props.filtro}
                    />        
                    <Griglia00Righe 
                        dati={ this.props.datiTab } 
                        colonne={ this.props.colonneTab }
                        testoRicerca={this.state.testoRicerca}
                    />
                </div>                
            </>
        );
    }
}

class Griglia00Colonne extends Component {

    render() {
        let col = [];
        let testo = '';
        this.props.colonne.forEach( objCol => {

            if ((objCol.label === null) || (objCol.label === undefined) || (objCol.label === ''))
                testo = objCol.col;
            else
                testo = objCol.label;

            col.push(
                <th className='th_grid00' >
                    { testo }
                </th>
                );
        });

        return (
            <thead>
                    <tr className='tr_grid00'>
                        { col }
                    </tr>                                    
            </thead> );
    }
}

class Griglia00Riga extends Component {    
    render() {
        let valVisibili = [];        
        const testoRicerca = this.props.testoRicerca;
        let trovato = 0;
        let testo = '';
        
        Object.entries(this.props.dati).forEach(([key, value]) => {        
            this.props.colonne.forEach( objCol => {
                if ((objCol.col.indexOf(key) > -1 ) && (objCol.tipo.toLowerCase() !== 'img')) {   

                    testo = '' + value;
                    if ( testo.toLowerCase().indexOf( testoRicerca.toLowerCase() ) !== -1 ) {
                        trovato = 1;                    
                    }                     
                }
            });            
        });

        if ((trovato !== 0 ) || (testoRicerca === '') || (testoRicerca === null)) {
            this.props.colonne.forEach( objCol => {
                Object.entries(this.props.dati).forEach(([key, value]) => { 
                    if (objCol.col.indexOf(key) > -1 ) { 
                        switch (objCol.tipo.toLowerCase()) {
                            case 'txt':
                                valVisibili.push( <td className='td_grid00_txt'>{value}</td> );
                                break;
                            case 'num':
                                valVisibili.push( <td className='td_grid00_num'>{value}</td> );
                                break;
                            case 'img': 
                                valVisibili.push( <td className='td_grid00_img'> <img src={value} alt='img'></img> </td> );
                                break;
                            default:
                                valVisibili.push( <td className='td_grid00'>{value}</td> );        
                        }
                        

                        
                    };                                                    
                });
            });    
        }
        return (
            <>
                <tr className='tr_grid00'>
                    { valVisibili }
                </tr>
            </>            
        );        
    }
}

class Griglia00Righe extends Component {
    render() {       
        const righe = [];       
        this.props.dati.forEach( (datoRiga, id) => {
            righe.push( 
                    <Griglia00Riga 
                        dati={datoRiga} 
                        colonne={this.props.colonne }
                        testoRicerca={this.props.testoRicerca}                                             
                        id={id}
                    />                    
                );                    
        });        
        return (
            <table className='tab_grid00'>
                <Griglia00Colonne colonne={this.props.colonne } />
                <tbody>{righe}</tbody>
            </table>
            );
    }
}

class Griglia00Titolo extends Component {
    render() {
        return (
            <>
                <div className='div_grid00_titolo'>
                    { this.props.titolo }
                </div>                
            </>
        );
    }    
}

class Griglia00Ricerca extends Component {
    constructor(props){
        super(props);
        this.handleTestoRicercaChange = this.handleTestoRicercaChange.bind( this );
    }

    handleTestoRicercaChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        let testoRicerca = this.props.testoRicerca;        
        if (this.props.filtro === 0) return<></>;        

        return (
            <form>
                <input  
                    type="text"
                    placeholder='Cerca..'
                    value={testoRicerca}
                    onChange={this.handleTestoRicercaChange}
                />
            </form>
        )
    }
        
    

}

export default Griglia00;
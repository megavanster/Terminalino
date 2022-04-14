import React, {Component} from 'react';
import Menu from './Menu';
import BarraTitolo01 from './components/Barra_titolo01';
import Carico from './Carico';
import Griglia01 from './components/Griglia01';
import Articoli from './Articoli';
import Ora from './Ora';
import 'bootstrap/dist/css/bootstrap.css';
import FotocameraTest from './FotocameraTest';


class Principale extends Component {
    constructor(props){
        super(props);
        this.state = { 
                titolo: {titolo: 'Menù principale', tipo_btn: 'H' }, 
                stato: 0 };
        this.pagPrecedente = this.pagPrecedente.bind( this );
        this.cambiaStato = this.cambiaStato.bind( this );
    }

    pagPrecedente( ) {             
        let valore = this.state.stato;
        valore = 0;
        if ( valore !== -1 )    
            this.setState({ stato: valore });
    }  
    
    cambiaStato(  stato ) {             
        let valore = stato;
        this.setState({ stato: valore });
    }      

    render() {
        let componente;
        let titolo = '';
        let tipo_bottone = '';

        let datiTab = [
            { utente: 'Filo', nome: 'Pippo', patrimonio: 500, avatarUrl: '/download.png' },
            { utente: 'Pluto', nome: 'Pluto', patrimonio: 1000, avatarUrl: '/download.png' },
            { utente: 'Gianfranco', nome: 'Jan', patrimonio: -10, avatarUrl: '/download1.png' }  
            ];
        let colonneTab = [ 
            { col: 'utente', tipo: 'txt', label: 'User'}, 
            { col: 'nome', tipo: 'txt', label: 'Nome'},   
            { col: 'avatarUrl', tipo: 'img', label: 'Foto'},
            { col: 'patrimonio', tipo: 'num', label: 'Soldi' }  
            ];
        let comandi = [
            { nome: 'Carico', descr: 'Carica bancale in cella', img: '', cmd: 1 },
            { nome: 'Test', descr: 'pagina di test', img: '', cmd: 2 },
            { nome: 'Altro tasto', descr: 'pagina di test', img: '', cmd: 0 },
            { nome: 'Articoli', descr: 'pagina di test', img: '', cmd: 3 },
            { nome: 'Ora', descr: 'pagina di test', img: '', cmd: 4 },
            { nome: 'Foto test', descr: 'pagina di test', img: '', cmd: 5 }
        ];             
        

        switch ( this.state.stato ) {
            case 1: 
                titolo= 'Carica un collo';
                tipo_bottone= 'B';
                componente = <Carico />;
                break;
            case 2:
                titolo= 'Pagina di test';
                tipo_bottone= 'B';
                componente = <Griglia01 
                        filtro={1} 
                        titolo="Elenco anagrafiche"
                        datiTab={datiTab}
                        colonneTab={colonneTab}
                    />    
                break;                                                
            case 3:
                titolo= 'Articoli';
                tipo_bottone= 'B';
                componente = <Articoli
                    />    
                break;                                                                
            case 4:
                titolo= 'Ora esatta';
                tipo_bottone= 'B';
                componente = <Ora />    
                break;
            case 5:
                titolo= 'Test video';
                tipo_bottone= 'B';                
                componente = <FotocameraTest />    
                break;                
            default:
                titolo= 'Menù principale';
                tipo_bottone= 'H';
                componente = <Menu 
                    comandi={comandi}
                    onClickBtn={this.cambiaStato} 
                    /> ;                                
        }

        return (
            <>
                <BarraTitolo01 
                    titolo={titolo}
                    onClickBtn ={ this.pagPrecedente }
                />      
                { componente }
                
            </>
        );
    }    
}



export default Principale;
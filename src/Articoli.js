import React, {Component} from 'react';
import Griglia01 from './components/Griglia01';
import './components/Griglia00.css';

class Articoli extends Component {
    constructor(props) {
        super(props);
        this.state = { datiTab: [{}] };                 
    }

    componentDidMount(){
        const fields = { parametro: 1 };
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('http://nov-sv01:3005/get_articoli', { 
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
            this.setState( {datiTab: data });                   
        })
        .catch( (err) => {
            console.log("Errore");
            console.log(err);
        });
    }

    render(){        
        let colonneTab = [ 
            { col: 'tipo_art', tipo: 'txt', label: 'Tipo'}, 
            { col: 'cod_art', tipo: 'txt', label: 'Codice'},
            { col: 'qta', tipo: 'num', label: 'Qta' },
            { col: 'image', tipo: 'img', label: ''}  
            ];
        return (
            <>
                <Griglia01 
                        filtro={1} 
                        titolo="Lista articoli"
                        datiTab={this.state.datiTab}
                        colonneTab={colonneTab}
                />              
            </>
        );
    }
}


export default Articoli;
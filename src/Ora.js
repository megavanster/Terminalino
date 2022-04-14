import React, {Component} from 'react';


class Ora extends Component {
    constructor(props) {
        super(props);
        // this.state = { datiTab: [{}] };                 
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8084/api/todo/time', {mode: 'no-cors'})
        .then((res) => {
            console.log( res );
            return res.json();                           
        })
        .catch( (err) => {
            console.log("Errore");
            console.log(err);
        });
    }

    render(){        

        return (
            <>
            ***
            </>
        );
    }
}


export default Ora;
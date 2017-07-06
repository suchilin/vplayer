import React from 'react';
import {observer} from 'mobx-react';
import {Input, Icon, Row, Col, Button} from 'react-materialize';

@observer
export default class CatalogacionPanel extends React.Component{
    selectDescripcion(e){
            this.props.store.descripcion = e.target.value;
        }
    
    selectGenero(e){
            this.props.store.genero = e.target.value;
        }
    
    submitCat(e){
        e.preventDefault();
        var store = this.props.store;
        store.video = this.props.mstore.id;
        store.inicio = this.props.mstore.stextbox
        store.fin = this.props.mstore.etextbox
        var status_ = this.props.store.create()
        //this.props.mstore.VideoCat(store.video)
       
    }
        
    render(){
        return(
            <div>
                <form onSubmit={this.submitCat.bind(this)}>
            <Row>
                <Col l={12} >
                    <h4>Catalogacion:</h4>
                </Col>
            </Row>
            <Row className="inline">
                    <Input  
                        label="Descripcion" 
                        value = {this.props.store.descripcion}
                        onChange={this.selectDescripcion.bind(this)}/>
                    <Input type="select"
                        onChange={this.selectGenero.bind(this)} >
                    
                        <option value="" disabled selected>Elija el genero</option>
                        <option value="Noticiario">Noticiario</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Revista">Revista</option>
                        <option value="Peticion">Pelicula</option>
                        <option value="Autopromocional">Autopromocional</option>
                        <option value="Deportes">Deportes</option>
                    
                </Input>    
                    <Button>Guardar</Button>
                
                </Row>
                </form>
            </div>
        )
    }
}

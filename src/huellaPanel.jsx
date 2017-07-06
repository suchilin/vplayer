import React from 'react';
import {Input, Icon, Row, Col, Button} from 'react-materialize';

export default class HuellaPanel extends React.Component{
    render(){
        return(
            <Row>
                <Col l={12}>
                    <h4>Huella acoustica</h4>
                </Col>
                <Col s={12} l={6}>
                    <Input  label="Descripcion" s={12} />
                </Col>
                <Col s={12} l={6}>
                    <Input  label="Marca"  s={12}/>
                </Col>
                <Col s={12}>
                    <h5>Clasificacion: </h5>
                </Col>
                <Col s={12} l={6}>
                    <Input name='group1' type='radio' value='red' label='A' />
                    <Input name='group1' type='radio' value='yellow' label='A+' />
                    <Input name='group1' type='radio' value='green' label='B15' className='with-gap' />
                    <Input name='group1' type='radio' value='brown' label='C' />
                </Col>
                <Col s={12} l={6}>
                    <Button>Guardar</Button>
                </Col>
            </Row>
        )
    }
}
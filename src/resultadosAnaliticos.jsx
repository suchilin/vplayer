import React from 'react';
import {observer} from 'mobx-react';
import analiticosStore from './analiticosStore.jsx'
import $ from 'jquery';
import {Row,
        Col,
        Icon, 
        Input,
        Button,
        Table,
        Dropdown,
        NavItem
} 
from 'react-materialize';

class FinalizadoPanel extends React.Component{
    render(){
        return(
            <div>
            <Row>
                <Col l={3}></Col>
                <Col l={6}>
                     <video id="example_video_1" className="video-js vjs-default-skin video_js_"
                        ref={ node => this.videoNode = node }
                        controls 
                        data-setup='auto'
                        >
                       <source src={this.props.store.video} type="video/mp4"></source>
                    </video>
                </Col>
            </Row>
                {
                    this.props.store.video_texto!==''
                    ?
                    <div>
                    <div className="row">
                        <div className="col s12 m12 l6">
                            <h5>Transcripción</h5>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div className="card-panel blue-grey lighten-5">
                                <span className="black-text">{this.props.store.video_texto}</span>
                            </div>
                        </div>
                    </div>

                    </div>
                    : ""
                }
            </div>
        )
    }
}

@observer
class _resultadosAn extends React.Component{
    componentDidMount(){
        $.when(
            this.props.store.getAnalisis()
        ).done(this.props.store.loading=false);
    }
    render(){
        return(
            <div className="container">

                <div className="row">
                    <div className="flow-text" className="col s12 m12 l12">
                        <h4>Resultados de Análisis</h4>
                        
                          {this.props.store.loading 
                            ?
                            <div className="progress">
                              <div className="indeterminate"></div>
                          </div>
                            :
                            <FinalizadoPanel store={this.props.store} />
                            }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default class resultadosAn extends React.Component{
    render(){
        return(
            <_resultadosAn store={analiticosStore} />
        )
    }
}
import React from 'react';
import {render} from 'react-dom';
import {observer} from 'mobx-react';
import resultadosAn from './resultadosAnaliticos.jsx'
import './index.scss';
import BottomPanelStore from './mainStore.jsx';
import TestigoPanel from './testigoPanel.jsx';
import testigoStore from './testigoStore.jsx';
import HuellaPanel from './huellaPanel.jsx';
import CatalogacionPanel from './catalogacionPanel.jsx';
import CatalogacionPanelStore from './catalogacionStore.jsx';
import AnaliticosPanel from './analiticosPanel.jsx';
import { BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
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
require('!style-loader!css-loader!video.js/dist/video-js.css')
import videojs from 'video.js';
import './rangeslider/rangeslider.js';
require('!style-loader!css-loader!./rangeslider/rangeslider.css')

@observer
class App extends React.Component {
    componentDidMount() {
        this.player = videojs(this.videoNode,
                              {controls:true}, function onPlayerReady() {
            
        });
        var options ={hidden:false};
        this.player.rangeslider(options);
        this.player.on("sliderchange",()=>{
            var values = this.player.getValueSlider();
            this.props.store.stextbox = values.start.toFixed(2);
            this.props.store.etextbox = values.end.toFixed(2);
            var end = this.props.etextbox;
            var start = this.props.store.stextbox
            if(start !=='' && end !== ''){
                this.props.store.abutton = true;
            }else{
                this.props.store.abutton = false;
            }
        });
    }
    
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }
    
    _handleVideoChange(e) {
        var store = this.props.store
        store.getPath(store.canal, store.fecha, store.hora)
        //var vdeo = store.path;
        //var video_ = require(`./media/${vdeo}`);
        var vdeo = 'http://localhost:8000/static/'+store.path
        var sources = [{"type":"video/mp4", "src": vdeo}]
        this.player.pause();
        this.player.src(sources);
        this.player.load();
        this.player.play();
        setTimeout(()=>{
            store.VideoCat(store.id);
        },1500)
    }
    
    playInterval(inicio, fin, e){
        this.player.playBetween(inicio, fin);
        this.props.store.stextbox = inicio;
        this.props.store.etextbox = fin;
        var end = this.props.etextbox;
        var start = this.props.store.stextbox
        if(start !=='' && end !== ''){
            this.props.store.abutton = true;
        }else{
            this.props.store.abutton = false;
        }
    }
    
    ShowBottomPanel(e){
        e.preventDefault();
        this.props.store.acciones = e.currentTarget.id
    }
    
    selectCanal(e){
        var store = this.props.store
        store.canal = e.target.value;
    }
    
    selectFecha(e){
        var store = this.props.store
        var d = Date.parse(e.target.value)
        store.fecha = new Date(d).toISOString().slice(0,10)
    }
    
    selectHora(e){
        var store = this.props.store
        store.hora = e.target.value;
    }
    
    startChangeV(event){
        this.props.store.stextbox = event.target.value;
        var start = event.target.value;
        var end = this.props.store.etextbox
        if(start !='' && end != ''){
            this.props.store.abutton = true;
        }else{
            this.props.store.abutton = false;
        }
    }
    
    endChangeV(event){
        this.props.store.etextbox = event.target.value;
        var end = event.target.value;
        var start = this.props.store.stextbox
        if(start !=='' && end !== ''){
            this.props.store.abutton = true;
        }else{
            this.props.store.abutton = false;
        }
    }
    
    sliderChange(e){
        alert('hellow')
    }
    render () {
        return( 
            <div className="container">
                <Row><h5>Módulo de programación</h5></Row>
            <Row>
            <div className="inline">
                <Col s={12} m={4} l={3} className="inline">
                    <Icon>videocam</Icon>
                    <Input type="select" onChange={this.selectCanal.bind(this)}>
                        <option value="">Elija un canal</option>
                        <option value="CANAL2">CANAL 2</option>
                        <option value="XEWTV">XEWTV</option>
                        <option value="XHDF">XHDF</option>
                        <option value="XHGC">XHGC</option>
                    </Input>
                </Col>
            
                <Col s={12} m={4} l={3} className="inline">
                    <Icon>today</Icon>
                    <Input type="date" label="Fecha" onChange={this.selectFecha.bind(this)}></Input>
                </Col>
            
                <Col s={12} m={4} l={3} className="inline">
                    <Icon>query_builder</Icon>
                    <Input type="select" onChange={this.selectHora.bind(this)}>
                        <option value="" disabled selected>Elija una hora</option>
                        <option value="0">00:00</option>
                        <option value="1">01:00</option>
                        <option value="2">02:00</option>
                        <option value="3">03:00</option>
                        <option value="4">04:00</option>
                        <option value="5">05:00</option>
                        <option value="6">06:00</option>
                        <option value="7">07:00</option>
                        <option value="8">08:00</option>
                        <option value="9">09:00</option>
                        <option value="10">10:00</option>
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
                        <option value="16">16:00</option>
                        <option value="17">17:00</option>
                        <option value="18">18:00</option>
                        <option value="19">19:00</option>
                        <option value="20">20:00</option>
                        <option value="21">21:00</option>
                        <option value="22">22:00</option>
                        <option value="23">23:00</option>
                    </Input>
                </Col>
            
                <Col s={12} m={4} l={3} className="inline">
                    <Button floating waves='light' icon='play_arrow' onClick={this._handleVideoChange.bind(this)} />
                </Col>
            
            </div>
            </Row>
            <Row>
                <Col s={12} m={6} l={6}>
                    <Row>
                        <video id="example_video_1" className="video-js vjs-default-skin video_js_"
                            ref={ node => this.videoNode = node }
                            controls preload="none"
                            data-setup='{}'>
                        </video>
                    </Row>
                    <Row>
                        <Col l={12}>
                            <div className="input-field col s4">
                                <i className="material-icons prefix">skip_next</i>
                                <input id="icon_prefix"
                                    type="text" 
                                    className="validate" 
                                    value={this.props.store.stextbox} 
                                    onChange={this.startChangeV.bind(this)}    
                                    />
                            </div>
                            <div className="input-field col s4">
                                <i className="material-icons prefix">skip_previous</i>
                                <input id="icon_telephone" 
                                    type="tel" 
                                    className="validate" 
                                    value={this.props.store.etextbox} 
                                    onChange={this.endChangeV.bind(this)}
                                    />
                            </div>
                            
                        <div className="input-field">
                            {this.props.store.abutton === true ?
                            <a className='dropdown-button btn' href='#' data-activates='btmActionDD'>Acción</a>
                                :
                            <a className='dropdown-button btn' href='#' data-activates='btmActionDD' disabled>Acción</a>
                            }
                            <ul id='btmActionDD' className='dropdown-content'>
                                <li><a id="testigo" onClick={this.ShowBottomPanel.bind(this)}>Testigo</a></li>
                                <li><a id="huella" onClick={this.ShowBottomPanel.bind(this)}>Huella</a></li>
                                <li><a id="catalogacion" onClick={this.ShowBottomPanel.bind(this)}>Catalogación</a></li>
                                <li><a id="analiticos" onClick={this.ShowBottomPanel.bind(this)}>Analíticos</a></li>
                            </ul>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col l={12}>
                            {this.props.store.acciones=="testigo"
                                ?
                            <TestigoPanel 
                                store={testigoStore}
                                mstore={BottomPanelStore}
                                /> :""  }
                        </Col><Col l={12}>
                            {this.props.store.acciones=="huella"
                                ?
                            <HuellaPanel /> :""}       
                        </Col>
                        <Col l={12}>
                            {this.props.store.acciones=="catalogacion"
                                ?
                            <CatalogacionPanel 
                                store={CatalogacionPanelStore}
                                mstore={BottomPanelStore}
                            />:""}
                        </Col>
                        <Col l={12}>
                            {this.props.store.acciones=="analiticos"?<AnaliticosPanel history={this.props.history}/>:""}
                        </Col>
                    </Row>
                </Col>
                <Col s={12} m={6} l={6}>
                    <div className="scrollable">
                    <Table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Descripción</th>
                                <th>Inicio</th>
                                <th>Fin</th>
                                <th>Género</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.store.catalogs.map((cat_)=>{
                                    return <tr>
                                            <td>{cat_.id}</td>
                                            <td>{cat_.descripcion}</td>
                                            <td>{cat_.inicio}</td>
                                            <td>{cat_.fin}</td>
                                            <td>{cat_.genero}</td>
                                            <td><a href="#" onClick={this.playInterval.bind(this, cat_.inicio, cat_.fin)}><Icon>play_arrow</Icon></a></td>
                                        </tr>
                                })
                            }
                        </tbody>
                    </Table>
                    </div>
                    { Object.keys(this.props.store.statistics).length > 0 ?<h5>Estadisticas</h5>:""}
                       
                        {
                            data = []
                            Object.keys(this.props.store.statistics).map((obj_, i)=>{
                                return  <p>{ obj_+": "+(this.props.store.statistics[obj_]*100/this.player.duration()).toFixed(2)+"%"}</p>
                            })
                        }
                        
                </Col>
            </Row>
            </div>
        );
    }
}

class MainApp extends React.Component{
    render(){
        return <App store={BottomPanelStore} history={this.props.history}/>
    }
}                   
                    
class MainLayout extends React.Component{
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={MainApp} />
                <Route path="/resultados" component={resultadosAn} />
            </div>
        </Router>
    );
  }
};
render(<MainLayout />, document.getElementById('root'));

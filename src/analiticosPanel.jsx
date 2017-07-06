import React from 'react';
import {observer} from 'mobx-react';
import analiticosStore from './analiticosStore.jsx'
import BottomPanelStore from './mainStore.jsx';

@observer
class _analiticosPanel extends React.Component{

    changeLogos(){
        if(this.props.store.logos){
            this.props.store.logos = false;
        }else{
            this.props.store.logos = true;
        }
    }
    
    changeTexto(){
        if(this.props.store.texto){
            this.props.store.texto = false;
        }else{
            this.props.store.texto = true;
        }
    }
    
    changeEmociones(){
        if(this.props.store.emociones){
            this.props.store.emociones = false;
        }else{
            this.props.store.emociones = true;
        }
    }
    
    changePersonajes(){
        if(this.props.store.personas){
            this.props.store.personas = false;
        }else{
            this.props.store.personas = true;
        }
    }
    
    analizarForm(e){
        e.preventDefault();
        var store = this.props.store;
        var mstore = this.props.mstore;
        store.video_id = mstore.id;
        store.inicio = mstore.stextbox;
        store.fin = mstore.etextbox;
        this.props.history.push('/resultados')
        //console.log(this.props)
    }
    
    render(){
        return(
            <div>
                <h4>Analiticos</h4>
                <div className="row">
                <form>
                    <table className="col s12">
                        <tr>
                            <td>
                                <input 
                                    type="checkbox" 
                                    id="logos" 
                                    checked={this.props.store.logos}
                                    onChange={this.changeLogos.bind(this)}
                                />
                                <label htmlFor="logos">Identificación de Logos</label>
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    id="text" 
                                    checked={this.props.store.texto}
                                    onChange={this.changeTexto.bind(this)}
                                />
                                <label htmlFor="text">Speech to Text</label>
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    id="emociones" 
                                    checked={this.props.store.emociones}
                                    onChange={this.changeEmociones.bind(this)}
                                />
                                <label htmlFor="emociones">Análisis de Emociones</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    type="checkbox" 
                                    id="personajes" 
                                    checked={this.props.store.personas}
                                    onChange={this.changePersonajes.bind(this)}
                                />
                                <label htmlFor="personajes">Personajes</label>
                            </td>
                            <td></td>
                            <td>
                                <a 
                                    className="waves-effect waves-light btn"
                                    onClick={this.analizarForm.bind(this)}
                                >Analizar</a>            
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            </div>
        )
    }
}

export default class AnaliticosPanel extends React.Component{
    render(){
        return(
            <_analiticosPanel store={analiticosStore} mstore={BottomPanelStore} history={this.props.history} />
        )
    }
}
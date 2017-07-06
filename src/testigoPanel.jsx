import React from 'react';
import {render} from 'react-dom';
import {Input, Button} from 'react-materialize';
import {observer} from 'mobx-react';
import {testigoStore} from './testigoStore.jsx';

class downloadLink extends React.Component{
    render(){
        return(
            <a href={this.props.store.filename} download>Descargar testigo</a>
        )
    }
}

@observer
export default class TestigoPanel extends React.Component{
    save_as(e){
        e.preventDefault();
        var video_id = this.props.mstore.id
        var stextbox = this.props.mstore.stextbox
        var etextbox = this.props.mstore.etextbox
        this.props.store.getFile(video_id, stextbox, etextbox);
        /*var blob = new Blob(["Funcionalidad aun no implementada"], {type: "text/plain;charset=utf-8"});
        if(this.props.store.filename != ''){
            FileSaver.saveAs(blob, this.props.store.filename+'.txt');
        }else{
            FileSaver.saveAs(blob, 'newfile.txt');
        }*/
    }
    
    _fileName(e){
        this.props.store.filename = e.target.value;
    }
    
    render(){
        return(
            <div>
                <div>
                    <h3>Generar testigo</h3>
                    <div className="inline">
                        <Input label="Nombre de archivo testigo" onChange={this._fileName.bind(this)}></Input>
                        <Button onClick={this.save_as.bind(this)}>Guardar</Button>
                        {this.props.store.filename !== ''?<a href={"http://localhost:8000/"+this.props.store.filename} download="true" >Download</a>:''}
                    </div>
                </div>
            </div>
        )
    }
}
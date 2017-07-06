import { observable } from 'mobx'
import { BottomPanelStore } from './mainStore.jsx';

class CatalogacionPanelStore{
    @observable video = '';
    @observable descripcion = '';
    @observable genero = '';
    @observable inicio = 0;
    @observable fin = 0;
     
     create(){
        var resp = null
        var data = {}
        data.video = this.video;
        data.descripcion = this.descripcion;
        data.genero = this.genero;
        data.inicio = this.inicio;
        data.fin = this.fin;
        $.ajax({
            type: 'post',
            async: false,
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            url: 'http://localhost:8000/video/catalogs/',
            context: this,
            data: JSON.stringify(data)
        })
        .done(function(res, textStatus, xhr){
            })
        .fail(function(xhr){
            resp = xhr.status
        });
    }
    
}

export default new CatalogacionPanelStore();

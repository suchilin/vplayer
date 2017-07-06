import { observable } from 'mobx'

class BottomPanelStore{
    @observable acciones = '';
    @observable stextbox = '';
    @observable etextbox = '';
    @observable abutton = false;
    @observable id = '';
    @observable canal = '';
    @observable fecha = '';
    @observable hora = '';
    @observable path = '';
    @observable catalogs = [];
    @observable statistics = {};
     
    getPath(canal, fecha, hora){
        var self = this
        var _url = '?';
        if(canal !== ''){
            _url += 'canal='+canal
        }else{
            alert("Seleccione un canal");
            return true;
        }
        if(fecha){
            _url += '&fecha='+fecha
        }else{
            alert('Seleccione la fecha');
            return true;
        }
        if(hora){
            _url += '&hora='+hora
        }else{
            alert('Seleccione la hora');
            return true;
        }
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            async: false,
            url: 'http://localhost:8000/video/videos/'+_url,
            context: this,
        }).done(function(res){
            console.log(res[0])
            self.path = res[0].path
            self.id = res[0].id
            return true
        });

    }
     
    VideoCat(v_id){
        this.catalogs = [];
        this.statistics = {};
        var self = this
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            url: 'http://localhost:8000/video/catalogs/?video='+v_id,
            context: this,
        })
        .done(function(res){
            self.catalogs = []
            res.map(function(obj_){
                self.catalogs.push(obj_)
                var tiempo = obj_.fin - obj_.inicio;
                if(self.statistics[obj_.genero]){
                    self.statistics[obj_.genero] += tiempo;
                }else{
                    self.statistics[obj_.genero] = tiempo;
                }
            })
            console.log(self.statistics)
        })
        .fail(function(e){
            console.log(e);
        });

    }


}

export default new BottomPanelStore();

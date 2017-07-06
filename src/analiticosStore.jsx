import { observable } from 'mobx'

class analiticosStore{
    @observable video_id = '';
    @observable inicio = '';
    @observable fin = '';
    @observable emociones = true;
    @observable personas = true;
    @observable logos = true;
    @observable texto = true;
    @observable loading = true;
    @observable video = ''
    @observable video_texto = ''
     
    getAnalisis(){
        var self = this
        var video_id = this.video_id;
        var inicio = this.inicio;
        var fin = this.fin;
        var url = 'http://localhost:8000/video/analiticos/';
        url += '?video_id='+video_id+'&inicio='+inicio+'&fin='+fin
        if(this.emociones){
            url +='&options=EMO'
        }
        if(this.personas){
            url += '&options=PER'
        }
        if(this.logos){
            url += '&options=LOG'
        }
        if(this.texto){
            url += '&options=TEX'
        }
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            async: false,
            url: url,
            context: this,
        }).done(function(res){
            console.log(res)
            self.video = res.playing.replace('static/video/','http://localhost:8000/')
            self.video_texto = res.texto
            return true
        });
    }
}

export default new analiticosStore();
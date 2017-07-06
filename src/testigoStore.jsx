import { observable } from 'mobx'

class testigoStore{
    @observable filename = '';

    getFile(video_id, inicio, fin){
        var self = this
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            async: false,
            url: 'http://localhost:8000/video/testigo/',
            context: this,
            data:{
                'video_id':video_id,
                'inicio':inicio,
                'fin':fin
            }
        }).done(function(res){
            self.filename = res;
            return true
        });
    }
}

export default new testigoStore();
const tagTemplate = '<a class="badge badge-secondary" href="#N" data-remove-tag data-id="{{id}}" data-title="{{title}}">{{title}}</a>';
const tags = [];

$(document).ready(function(){
    ipcRenderer.on('add:tag',function(e,tag){
        if( tags.indexOf(tag.id) == -1 ){
            let tagHtml = tagTemplate.replace(/{{id}}/g,tag.id).replace(/{{title}}/g,tag.title);
        
            $('[data-tag-list]').append(tagHtml);
            tags.push(tag.id);
        }
    });

    $('body').on('click','[data-remove-tag]',function(e){
        e.preventDefault();
        let index = tags.indexOf($(this).data('id'));
        if( index > -1){
            tags.splice(index, 1);
            $(this).remove();
        }
    })
});
const tagTemplate = '<a class="badge badge-secondary" href="#N" data-remove-tag data-id="{{id}}" data-title="{{title}}">{{title}}</a>';
const tags = [];

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
var options = {
    //debug: 'info',
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: 'Crear una entrada...',
    theme: 'snow'
  };
  var editor = new Quill('#editorQuill', options);

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
    });

    $('[data-btn-save]').click(function(){
        $('[data-loader-success]').addClass('d-none');
        $('[data-loader]').removeClass('d-none');
        let data = {};
        //console.log($('.ql-editor').html());
        //data.content = $('[data-post=body]').val();
        data.content = $('.ql-editor').html();
        data.title = $('[data-post=title]').val();
        data.summary = $('[data-post=summary]').val();
        data.pretty_url = $('[data-post=pretty]').val();
        data.tags = tags;
        //console.log(data);
        ajaxSave('savePost',data,function(res){
            $('[data-loader]').addClass('d-none');
            $('[data-loader-success]').removeClass('d-none');
        });
    });
});
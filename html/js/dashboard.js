$(document).ready(function(){

    function requestDashboard(){
        ajaxQuery('dashboard',function(res){
            if(res.status == 200){
                $('[data-dashboard=tags]').html(res.data.tags);
                $('[data-dashboard=posts]').html(res.data.posts);
                $('[data-dashboard=slider]').html(res.data.slider);
                $('[data-dashboard=footer]').html(res.data.footer);
            }
            setTimeout(requestDashboard,5000);
        });
    }

    requestDashboard();

    $('[data-refresh-instagram]').click(function(){
        let self = $(this);
        self.find('.badge').removeClass('d-none');
        $.ajax({
            type: "GET",
            url: globalUrl + 'insta_crawler/downloadPics',
            success: function(res){
                if(res.status == 200){
                    self.find('.badge').addClass('d-none');
                }
            },
            dataType: 'json'
        });
    });
});
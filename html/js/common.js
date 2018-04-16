const electron = require('electron');
const { ipcRenderer } = electron;
const globalUrl = 'http://jh.localhost/';

function ajaxSave(url, data, cb) {
    $.ajax({
        type: "POST",
        url: globalUrl + 'rest/' + url,
        data: data,
        success: cb,
        dataType: 'json'
    });
}

function ajaxQuery(url,cb,data){
    data = data || {};
    $.ajax({
        type: "GET",
        url: globalUrl + 'rest/' + url,
        data: data,
        success: cb,
        dataType: 'json'
    });
}

$(document).ready(function () {
    $('[data-load-view]').on('click', function (e) {
        let view = $(this).data('view');
        let size = $(this).data('size') || 'small';
        let options = { view: view, size: size };

        ipcRenderer.send('load:view', options);
    });
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* Import TinyMCE */
var tinymce = require('tinymce/tinymce');

/* Default icons are required for TinyMCE 5.3 or above. Also import custom icons if applicable */
require('tinymce/icons/default');

/* A editor theme (required) - customize the editor appearance by creating a 'skin' */
require('tinymce/themes/silver');

/* Import the editor skin - replace with a custom skin if applicable. */
require('tinymce/skins/ui/oxide/skin.css');

/* Import plugins - include the relevant plugin in the 'plugins' option. */
require('tinymce/plugins/emoticons');
require('tinymce/plugins/emoticons/js/emojis');
require('tinymce/plugins/print');
require('tinymce/plugins/preview');
require('tinymce/plugins/searchreplace');
require('tinymce/plugins/autolink');
require('tinymce/plugins/directionality');
require('tinymce/plugins/visualblocks');
require('tinymce/plugins/visualchars');
require('tinymce/plugins/fullscreen');
require('tinymce/plugins/image');
require('tinymce/plugins/imagetools');
require('tinymce/plugins/link');
require('tinymce/plugins/media');
require('tinymce/plugins/template');
require('tinymce/plugins/codesample');
require('tinymce/plugins/table');
require('tinymce/plugins/charmap');
require('tinymce/plugins/hr');
require('tinymce/plugins/pagebreak');
require('tinymce/plugins/nonbreaking');
require('tinymce/plugins/anchor');
require('tinymce/plugins/toc');
require('tinymce/plugins/insertdatetime');
require('tinymce/plugins/advlist');
require('tinymce/plugins/lists');
require('tinymce/plugins/wordcount');
require('tinymce/plugins/code');
require('tinymce/plugins/textpattern');
require('tinymce/plugins/help');

/*Language DE */
require('./tinyMce.DE.js');

 /* Initialize TinyMCE */
exports.render = function (selector, height) {
    
    tinymce.init({
        selector: selector,
        language: 'de',
        height: height,
        plugins: 'emoticons print preview  searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount code imagetools textpattern help',
        toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | emoticons | removeformat',
        block_formats: 'Überschrift 1=h1;Überschrift 2=h2;Überschrift 3=h3;Überschrift 4=h4;Überschrift 5=h5;Überschrift 6=h6;Absatz=p;Absatz Groß=leadp;',
        formats: { 
            leadp: { 
                block: 'p', 
                classes: 'lead' 
            } 
        },
        templates: [
            {"title": "Some title 1", "description": "Some desc 1", "content": "My content"},
            {"title": "Some title 2", "description": "Some desc 2", "content": "development.html"}
        ],
        skin: false,
        content_css: '/tinyMceCss/publicMain.css',
        content_style: false,
        images_upload_url: '/tinymceUpload.php',
        images_upload_base_path: '/',
        images_upload_credentials: false,
        relative_urls : true,
        remove_script_host : false,
        image_advtab: true,
        urlconverter_callback : 'tinymceURLConverter'
    });
    
    
};

tinymceURLConverter = function(url, node, on_save, name) {
    return url;
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    
    if (results == null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
};

isEmpty = function(str) {
    return (!str || 0 === str.length);
};
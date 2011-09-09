var socket = io.connect();

socket.on('order', function(order){
    $('#log').append($('<li></li>').text(fDate(order.date) + 'page: ' + order.page + ', block: ' + order.block));
    $(window).scrollTop(9999999999);
});

socket.on('userinfo', function(user){
    $('#log').append($('<li></li>').text(fDate(user.date) + user.user + ' ' + user.type + '.'));
    $(window).scrollTop(9999999999);
});

socket.on('show comment', function(comment){
    $('#log').append($('<li></li>').text(fDate(comment.date) + comment.user + ': ' + comment.message));
    $(window).scrollTop(9999999999);
});

function fDate(date){
    var dd = new Date(date);
    var str = '[' + dd.getFullYear() + '/' +
              fn(dd.getMonth()+1) + '/' +
              fn(dd.getDate()) + ' ' +
              fn(dd.getHours() ) + ':' +
              fn(dd.getMinutes()) + ':' +
              fn(dd.getSeconds()) + '] ';
    return str;
}

function fn(n){
    return ('00' + n).slice(-2);
}

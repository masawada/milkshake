var eggnog = Eggnog.init(slide, 'slides', $(window).width()-240, $(window).height()-60);
var socket = io.connect();


socket.on('init slide', function(pb){
    eggnog.jumpTo(pb.page, pb.block);
    console.log(pb);
});

socket.on('init comments', function(action){
    for(var i = 0; i < action.length; i++){
        $('#comments').append($('<li></li>').text(action[i].user+': '+action[i].message).addClass('comment'))
    }
    $('#comments').scrollTop(9999999999);
});

socket.on('usernames', function(users){
    $('#users').empty();
    for(var k in users){
        $('#users').append($('<li></li>').text(users[k]).addClass('user'));
    }
    $('#users').scrollTop(0);
});

socket.on('order', function(order){
    var type = order.type;
    if(type=== 'next'){
        eggnog.next();
    }else if(type === 'prev'){
        eggnog.prev();
    }
        
    if(eggnog.render.page !== order.page || eggnog.render.block !== order.block){
        eggnog.render.jumpTo(order.page, order.block);
    }
});

socket.on('show comment', function(comment){
    $('#comments').append($('<li></li>').text(comment.user+': '+comment.message).addClass('comment')).scrollTop(9999999999);
});

$(function(){
    // login
    $('#login').click(function(){
        $('#login-form').submit();
        return false;
    });
    
    $('#login-form').submit(function(){
        socket.emit('login', $('#username').val(), function(loggedin){
            if(loggedin){
                $('#message').val('').focus();
                $('#login-panel').css('display', 'none');
                $('#main').css('display', 'block');
            }
            $('#login-error').css('display', 'block');
        });
        return false;
    });
    
    // message
    $('#send').click(function(){
        $('#message-form').submit();
        return false;
    });
    
    $('#message-form').submit(function(){
        if($('#message').val()){
            socket.emit('comment', $('#message').val());
            $('#message').val('').focus();
        }
        return false;
    });
    
    // init elements
    resizeElements();
    $(window).resize(function(){resizeElements();});
    
    $('#open-users').click(function(){
        $('#comments, #open-comments').removeClass('current');
        $('#users, #open-users').addClass('current');
        return false;
    });
    
    $('#open-comments').click(function(){
        $('#users, #open-users').removeClass('current');
        $('#comments, #open-comments').addClass('current');
        $('#comments').scrollTop(9999999999);
        return false;
    });
    
    function resizeElements(){
        var w = ($(window).width() > 400)? $(window).width() : 400;
        var h = ($(window).height() > 300)? $(window).height() : 300;
        
        eggnog.setSize(w-240, h-60);
        $('#main').css({width: w+'px', height: h+'px'});
        $('#show').css('height', (h-60)+'px');
        $('#view').css({width: (w-240)+'px', height: (h-60)+'px'});
        $('#slides').css({marginTop: '-'+(eggnog.utl.height+60)/2+'px', marginLeft: '-'+(eggnog.utl.width+240)/2+'px'});
        $('#lists').css('height', (h-60)+'px');
        $('#lists-view').css('height', (h-84)+'px');
        $('#message-form').css('width', w+'px');
        $('#message-box').css('width', (w-126)+'px');
        $('#message').css('width', (w-144)+'px');
    }
});
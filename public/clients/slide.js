var eggnog = Eggnog.init(slide, 'slides', 'window', 'window');
var socket = io.connect();

socket.on('init slide', function(pb){
    eggnog.jumpTo(pb.page, pb.block);
    console.log(pb);
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

$(function(){
    $('#slides').css({marginTop:'-'+eggnog.utl.height/2+'px', marginLeft:'-'+eggnog.utl.width/2+'px'});    
    $(window).resize(function(){
        eggnog.setSize('window', 'window');
        $('#slides').css({marginTop:'-'+eggnog.utl.height/2+'px', marginLeft:'-'+eggnog.utl.width/2+'px'});
    });
});
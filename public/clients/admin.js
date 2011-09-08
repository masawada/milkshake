var eggnog = Eggnog.init(slide, 'slides', 320, 240);
var socket = io.connect();

socket.on('init slide', function(pb){
    eggnog.jumpTo(pb.page, pb.block);
    console.log(pb);
});

socket.on('order', function(order){
    console.log(order);
    if(eggnog.slide.page !== order.page || eggnog.slide.block !== order.block){
        eggnog.jumpTo(order.page, order.block);
    }
});

$(function(){
    $('#note').text(eggnog.getNote());
    
    $('#next').click(function(){
        eggnog.next();
        socket.emit('order', {
            type: 'next',
            page: eggnog.slide.page,
            block: eggnog.slide.block,
            secKey: seckey
        });
        $('#note').text(eggnog.getNote());
        return false;
    });
    
    $('#prev').click(function(){
        eggnog.prev();
        socket.emit('order', {
            type: 'prev',
            page: eggnog.slide.page,
            block: eggnog.slide.block,
            secKey: seckey
        });
        $('#note').text(eggnog.getNote());
        return false;
    });
});

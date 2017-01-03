$('#settings').click(()=>{
    socket.emit('getSettings')
});
var r;
socket.on('getSettings', ()=>{
    let bio = $('#bio').children('.text').text();
    emptyMain();
    $('#main')
        .append($('<form>')
            .append($('<input>')
                .val(bio)
                .attr('id','bio')
                .attr('type','textfield'))
            .append($('<input>')
                .attr('id','pic')
                .attr('name','pic')
                .attr('type','file'))
            .append($('<button>')
                .attr('id','saveSettings')
                .attr('type','submit')
                .text('SAVE'))
            .submit((event)=>{
                event.preventDefault();
                r = new FileReader();
                r.onload = evnt=>{
                    socket.emit('saveSettings', evnt.target.result);
                    if(r.readyState = 'DONE')
                        socket.emit('done', $('#bio').val());
                }
                r.readyState
                r.readAsBinaryString(pic.files[0]);
                return false;
            }))

});

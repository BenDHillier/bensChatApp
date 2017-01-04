$('#settings').click(()=>{
    socket.emit('getSettings')
});
var r;
socket.on('getSettings', (data)=>{
    emptyMain();
    $('#main')
        .append($('<div>')
            .attr('id','settingsDiv')
            .append($('<img>')
                .attr('src',data.picture)
                .attr('id','newPic'))
            .append($('<form>')
                .attr('id','settingsForm')
                .append($('<input>')
                    .attr('id','pic')
                    .attr('name','pic')
                    .attr('type','file'))
                    .change(()=>{
                        console.log('hell9')
                        let r = new FileReader();
                        r.onload = ()=>{
                            $('#newPic').attr('src', r.result);
                        }
                        r.readAsDataURL(pic.files[0]);
                    })
                .append($('<textarea>')
                    .val(data.bio)
                    .attr('id','newBio')
                    .attr('type','textfield'))
                .append($('<button>')
                    .attr('id','saveSettings')
                    .attr('type','submit')
                    .text('SAVE'))
                .submit((event)=>{
                    event.preventDefault();
                    if(pic.files[0]){
                        r = new FileReader();
                        r.onload = evnt=>{
                            socket.emit('saveSettings', evnt.target.result);
                            if(r.readyState = 'DONE')
                                socket.emit('done', $('#newBio').val(), true);
                        }
                        r.readyState
                        r.readAsBinaryString(pic.files[0]);
                    } else {
                        socket.emit('done', $('#newBio').val(), false)
                    }
                })))

});

socket.on('doneSaving', ()=>{
    location.reload();
});

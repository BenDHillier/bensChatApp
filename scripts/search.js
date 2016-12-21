socket.on('search', (data)=>{
    if(data){
        renderProfile(data);
    } else {
        console.log("didn't worked");
    }
});

$('#searchBar').submit(()=>{
    console.log($('#searchQuery').val());
    let search = $('#searchQuery').val();
    socket.emit('search', search);
    return false;
});

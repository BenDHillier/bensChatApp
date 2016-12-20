socket.on('search', (data)=>{
    if(data){
        renderProfile(data);
    } else {
        console.log("didn't worked");
    }
});

$('#searchBar').submit(()=>{

    let search = $('#searchQuery').val();
    socket.emit('search', search);
    return false;
});

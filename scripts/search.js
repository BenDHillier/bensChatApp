socket.on('search', (data)=>{
    if(data){
        renderProfile(data);
    } else {
        console.log("didn't worked");
    }
});

$('#searchBar').submit(()=>{
    socket.emit('search', $('#searchQuery').val());
    return false;
});

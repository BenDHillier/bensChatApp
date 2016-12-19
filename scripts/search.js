socket.on('search', (success)=>{
    if(success){
        console.log('worked');
    } else {
        console.log("didn't worked");
    }
});

$('#searchBar').submit(()=>{

    let search = $('#searchQuery').val();
    socket.emit('search', search);
    return false;
});

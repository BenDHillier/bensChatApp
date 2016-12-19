socket.on('search', (data)=>{
    if(data){
        console.log(data.picture);
        $('#profilePicture').attr('src', data.picture);
        $('#username').text(data.username);
        $('#bio').text(data.bio);
    } else {
        console.log("didn't worked");
    }
});

$('#searchBar').submit(()=>{

    let search = $('#searchQuery').val();
    socket.emit('search', search);
    return false;
});

function updateRoom(id){
    $.ajax({
        url: '/viewroom/' + id,
        type: 'PUT',
        data: $('#updateRoom').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}
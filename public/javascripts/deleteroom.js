function deleteRoom(id){
    $.ajax({
        url: "/viewroom/" + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}
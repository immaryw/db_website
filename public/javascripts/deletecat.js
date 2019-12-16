function deleteCat(id){
    $.ajax({
        url: "/viewcat/" + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}
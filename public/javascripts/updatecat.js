function updateCat(id){
    $.ajax({
        url: '/viewcat/' + id,
        type: 'PUT',
        data: $('#updateCat').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}
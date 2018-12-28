$("#content").on('input', ()=>{
    $("#count").text(200 - $("#content").val().length);
});
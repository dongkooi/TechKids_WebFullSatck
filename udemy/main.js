function getData(apiUrl) {
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function(data) {
            console.log(data);
            $("#listCourses").attr("nextPage", data.next);
            for(let i = 0; i < 12; i++)
                $("#listCourses").append(
                    `
                    <div class="col-4">
                        <div class="card text-left" style="height: 420px;">
                            <img class="card-img-top" src="${data.results[i].image_240x135}" alt="Logo of course">
                            <div class="card-body">
                                <h4 class="card-title" >${data.results[i].title}</h4>
                                <p class="card-text">Price: ${data.results[i].price}</p>
                                <p class="card-text">Score: ${data.results[i].predictive_score}</p>
                                <a class="btn btn-primary" href="https://www.udemy.com${data.results[i].url}" value="">Go to this course</a>
                            </div>
                        </div>
                        <br>
                    </div>
                `)
        },
        error: function(err) {
            console.log("Error!!!", err);
        }
    });
}

$('#udemy_courses').on("submit", function() {
    let url = "https://udemy-course-api.herokuapp.com/api/courses?search="+$('#nameOfCourses').val()+"&price="+$( "#price option:selected" ).text();+"&page=1&page_size=12";
    event.preventDefault();
    getData(url);
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            let nextPage = $(".row").attr("nextPage")
            getData(nextPage);
        }
    });
});



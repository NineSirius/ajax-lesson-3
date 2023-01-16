let travelCards = [];
travelNum = 1;

$(".form").on("submit", function (e) {
    e.preventDefault();
    createTravelCard(
        $(".country-input").val(),
        $(".date-input").val(),
        $(".desc-input").val()
    );

    travelCards.push([
        $(".country-input").val(),
        $(".date-input").val(),
        $(".desc-input").val(),
    ]);
    localStorage.setItem("travelCards", JSON.stringify(travelCards));
});

$(".travel-content").on("click", ".travel-card", function (e) {
    if (e.target.classList.contains("delete")) {
        deleteCard($(this));
    }
});

function createTravelCard(country, date, description) {
    let tpl = $("#travel").html();
    let clonetpl = $(tpl).clone();
    clonetpl.find("h4").text("Запись");
    clonetpl.find("span.date").text(date);
    clonetpl.find("span.country").text(country);
    clonetpl.find("p.desc").text(description);
    $(".travel-content").append(clonetpl);
    travelNum++;
}

function init() {
    travelCards = JSON.parse(localStorage.getItem("travelCards")) || [];
    travelCards.forEach((elem) => createTravelCard(elem[0], elem[1], elem[2]));
}

init();

$(".country-input").easyAutocomplete({
    url: "https://restcountries.com/v2/all?fields=name,flag",
    getValue: "name",
    list: {
        match: {
            enabled: true,
        },
    },
    template: {
        type: "iconLeft",
        fields: {
            iconSrc: "flag",
        },
    },
});

function deleteCard(target) {
    const index = $(target).index();
    console.log(index);
    console.log(target);

    travelCards = JSON.parse(localStorage.getItem("travelCards")) || [];
    travelCards.splice(index - 1, 1);

    localStorage.setItem("travelCards", JSON.stringify(travelCards));
    target.remove();
}

class MetacriticData {
    Picture;
    Rate;
    Name;
    Date;
    Description;
}
let MetaBox = [];

const MetaData = new XMLHttpRequest();

MetaData.onreadystatechange = () => {
    if (MetaData.readyState === XMLHttpRequest.DONE) {

        if (MetaData.status === 200) {

            MetaData.onload = () => {
                let data = MetaData.responseText;

                let elm = document.getElementById("test");
                elm.innerHTML = data;

                removemetacritic();
                decodeMetacritic();

            }
        }
    }
}

MetaData.open("Get", "https://www.metacritic.com/search/all/batman/results", true);

// MetaData.setRequestHeader();
MetaData.send();



function removemetacritic() {
    document.getElementById("top_header").remove();
    document.getElementById("popup_login").remove();
    document.getElementById("popup_dialog").remove();
    document.getElementById("nav_ad_wrapper").remove();
    document.getElementById("fb-root").remove();
    document.getElementById("bottom_footer").remove();
    document.getElementsByClassName("search_header")[0].remove();
    document.getElementsByClassName("search_filters_nav")[0].remove();
    document.getElementsByClassName("round_style_page_nav")[0].remove();

    document.getElementsByTagName("title")[1].remove();
    document.getElementsByTagName("noscript")[0].remove();

    let meta = document.querySelectorAll("#test meta");
    let link = document.querySelectorAll("#test link");
    var script = document.querySelectorAll("#test script");

    for (let index = 0; index < 27; index++) {
        script[index].remove();
    }
    for (let index = 0; index < 8; index++) {
        meta[index].remove();
    }
    for (let index = 0; index < 10; index++) {
        link[index].remove();
    }


}

function decodeMetacritic() {

    document.getElementById('test2').innerHTML = document.querySelectorAll('.search_results ul')[0].innerHTML;
    document.getElementById("test").remove();

}
// data class for fetching data in array
class MetacriticData {
    Picture;
    Rate;
    Name;
    Date;
    Description;
}

// array class for colect data
let MetaBox = [];

function valid() {
    let test = String(document.querySelector("#search_text").value)
    if (test.trimStart() != "") {
        search()
    }
}


function search() {

    // clear last data
    clear();

    // ajax request to metacritic site
    const MetaData = new XMLHttpRequest();

    MetaData.onreadystatechange = () => {
        if (MetaData.readyState === XMLHttpRequest.DONE) {

            if (MetaData.status === 200) {

                MetaData.onload = () => {

                    // response data for first time
                    let data = MetaData.responseText;

                    // get html tag 
                    let elm = document.getElementById("test");
                    elm.innerHTML = data;

                    removemetacritic();

                    // Decode Data From Sec elm And Move Data in Array
                    decodeMetacritic();

                    if (MetaBox.length == 10) {
                        // get data & set in li tag
                        dataMaker();
                    }
                    console.log(MetaBox);
                }
            }
        }
    }

    // Url Link
    MetaData.open("Get", `https://www.metacritic.com/search/all/${document.getElementById("search_text").value}/results`, true);
    // MetaData.open("Get", `https://www.metacritic.com/search/all/avatar/results`, true);

    // MetaData.setRequestHeader();
    MetaData.send();

}

function dataMaker() {
    let mainbox = document.getElementById("main_box");

    for (let i = 0; i < 10; i++) {

        let scroll_side = document.createElement("li");
        scroll_side.className = "scroll_side";

        // img append
        let img_Box = document.createElement("div");
        img_Box.className = "img_box";
        img_Box.innerHTML = MetaBox[i].Picture;
        scroll_side.appendChild(img_Box);

        let text_box = document.createElement("div");
        text_box.className = "text_box";

        // site name append
        let site = document.createElement("div");
        site.className = "site";
        let site_p = document.createElement("p");
        site_p.innerHTML = "metacritic";
        site.appendChild(site_p);
        text_box.appendChild(site);

        // name append 
        let name = document.createElement("div");
        name.className = "name";
        let name_p = document.createElement("p");
        name_p.innerHTML = MetaBox[i].Name;
        name.appendChild(name_p);
        text_box.appendChild(name);

        let date = document.createElement("date");
        date.className = "date";
        let date_p1 = document.createElement("p");
        date_p1.innerHTML = MetaBox[i].Date;
        date.appendChild(date_p1);
        let date_p2 = document.createElement("p");
        date_p2.innerHTML = MetaBox[i].Rate;
        date.appendChild(date_p2);
        text_box.appendChild(date);

        scroll_side.appendChild(text_box);
        mainbox.appendChild(scroll_side);
    }
}

function decodeMetacritic() {

    var x = document.querySelectorAll('.search_results ul li');
    var data;

    for (let i = 0; i < 10; i++) {
        data = new MetacriticData();
        data.Picture = x[i].querySelector(".result_thumbnail").innerHTML;
        // data.Rate = x[i].querySelector(".main_stats .metascore_w").innerText; // maybe is null
        data.Name = x[i].querySelector("h3 a").innerHTML;
        data.Date = x[i].querySelector(".main_stats p").innerHTML;
        data.Description = x[i].querySelector(".deck ").innerHTML;
        MetaBox.push(data);
        console.log(MetaBox);
    }

    document.getElementById("test").remove();
}

function clear() {
    let data = document.querySelectorAll(".scroll_side");
    for (let i = 0; i < data.length; i++) {
        data[i].remove();
        MetaBox.pop();
    }
    MetaBox = [];

    let div = document.createElement("div");
    div.id = "test";

    let body = document.querySelector("body");

    body.appendChild(div);
}

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

    // document.getElementById("page").remove()

    let meta = document.querySelectorAll("#test meta");
    let link = document.querySelectorAll("#test link");
    var script = document.querySelectorAll("#test script");

    for (let index = 0; index < 27; index++) {
        script[index].remove();
    }
    for (let index = 0; index < 10; index++) {
        link[index].remove();
    }
    for (let index = 0; index < 8; index++) {
        meta[index].remove();
    }
}

// 164 line
// if user search wrong name the script show problem and bug
// we need to fix them
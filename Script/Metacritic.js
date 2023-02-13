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

                // Remove Junk Data And Keep Main Data
                // The End Remove elm Tag
                removemetacritic();

                // Decode Data From Sec elm And Move Data in Array
                decodeMetacritic();

                // Show Data After Move Data In Array
                for (let index = 0; index < 10; index++) {
                    console.log(MetaBox[index].Picture);
                    // console.log(MetaBox[index].Rate);
                    console.log(MetaBox[index].Name);
                    console.log(MetaBox[index].Date);
                    console.log(MetaBox[index].Description);    
                }

            }
        }
    }
}

// Url Link
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

    var x= document.querySelectorAll('.search_results ul li');
    var data 
    
    for(let i = 0; i <10 ; i++){
        data = new MetacriticData();
        data.Picture =x[i].querySelector(".result_thumbnail").innerHTML;
        // data.Rate = x[i].querySelector(".main_stats .metascore_w").innerHTML; // maybe is null
        data.Name = x[i].querySelector("h3 a").innerHTML;
        data.Date = x[i].querySelector(".main_stats p").innerHTML;
        data.Description = x[i].querySelector(".deck ").innerHTML;
        MetaBox.push(data);

    }
     
    document.getElementById("test").remove();
    document.getElementById("test2").remove();
}
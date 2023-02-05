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
                // elm.style.display = "none";

                for (let i = 0; i < 10; i++) {
                    let subData = new MetacriticData();
                    // subData.Picture = document.querySelectorAll(".result_wrap img")[i].childNodes[0].nodeValue;
                    subData.Rate = document.querySelectorAll(".metascore_w")[i].childNodes[0].nodeValue;
                    subData.Name = document.querySelectorAll(".product_title a")[i].childNodes[0].nodeValue;
                    subData.Date = document.querySelectorAll(".main_stats p ")[i].childNodes[0].nodeValue;
                    subData.Description = document.querySelectorAll(".deck")[i].childNodes[0].nodeValue;
                    MetaBox.push(subData);
                }

                console.log(MetaBox);

                let showText = "";
                for(let i = 0 ; i<MetaBox.length;i++){
                    showText += `${MetaBox[i].Rate} <br> ${MetaBox[i].Name} <br>
                     ${MetaBox[i].Date} <br> ${MetaBox[i].Description} <hr>`;
                }
                document.getElementById("test2").innerHTML =showText;
            }
        }
    }
}

MetaData.open("Get", "https://www.metacritic.com/search/all/avatar/results", true);

// MetaData.setRequestHeader();
MetaData.send();
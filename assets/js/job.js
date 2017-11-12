const jobfinder = {
    init: function () {
        this.chiletrabajos();
    },
    computrabajo: function () {
        "use strict";
        let base_url = "https://www.computrabajo.cl";
        let ws_url = "http://localhost/personal/inicio/computrabajo/";

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let response = JSON.parse(this.responseText);
                if (response.result) {
                    let li = '';
                    response.pages.forEach(pagina => {
                        let parser = new DOMParser();
                        let html = parser.parseFromString(pagina, "text/html");
                        let offers_get = html.getElementById("p_ofertas").getElementsByClassName("bRS bClick");

                        Array.from(offers_get).forEach(offer => {
                            let new_offer = {
                                title: offer.getElementsByClassName("js-o-link")[0].innerHTML,
                                url: base_url + offer.getElementsByClassName("js-o-link")[0].getAttribute("href"),
                                company: offer.getElementsByClassName("empr")[0].innerHTML,
                                date: offer.getElementsByClassName("dO")[0].innerHTML,
                                img: (offer.getElementsByClassName("lazy")[0]) ? offer.getElementsByClassName("lazy")[0].dataset.original : "https://s.ct-stc.com/web/c/cl/img/logo_cl.png",
                                address: offer.getElementsByClassName("w_100 fl mtb5 lT")[0].getElementsByTagName("span")[5].getElementsByTagName("a")[0].innerHTML + " - " + offer.getElementsByClassName("w_100 fl mtb5 lT")[0].getElementsByTagName("span")[4].getElementsByTagName("a")[0].innerHTML,
                                description: offer.querySelector("p[itemprop='description']").innerHTML
                            };

                            li += '<li class="media">';
                            li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">';
                            li += '<div class="media-body">';
                            li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>';
                            li += '<span>' + new_offer.date + ' / ' + new_offer.company + ' / ' + new_offer.address + '</span>';
                            li += '<p>' + new_offer.description + '</p>';
                            li += '</div>';
                            li += '</li>';
                        });
                    });
                    document.getElementById("offers").innerHTML = li;
                }
            }
        });

        xhr.open("GET", ws_url);
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send();
    },
    chiletrabajos: function () {
        "use strict";
        let base_url = "https://www.computrabajo.cl";
        let ws_url = "http://localhost/personal/inicio/chiletrabajos/";

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let response = JSON.parse(this.responseText);
                if (response.result) {
                    let li = '';
                    response.pages.forEach(pagina => {
                        let parser = new DOMParser();
                        let html = parser.parseFromString(pagina, "text/html");
                        let offers_get = html.getElementsByClassName("col-sm-6 page-content mb30")[0].getElementsByClassName("jobs-item with-thumb encuentra__empleo--yellow");

                        Array.from(offers_get).forEach(offer => {
                            let new_offer = {
                                title: offer.getElementsByClassName("title")[0].getElementsByTagName("b")[0].innerHTML,
                                url: offer.getElementsByClassName("title")[0].getElementsByTagName("a")[0].href,
                                company: offer.getElementsByClassName("meta")[0].innerHTML.trim(),
                                date: offer.getElementsByClassName("date")[0].innerHTML.replace(/span|<|>/g, "").replace("/", ""),
                                img: "https://s3.amazonaws.com/cht2/public/img/ch/featured.png",
                                address: offer.getElementsByClassName("meta")[0].innerHTML.trim(),
                                description: offer.getElementsByClassName("description")[0].innerHTML
                            };
                            console.log(offers_get);
                            li += '<li class="media">';
                            li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">';
                            li += '<div class="media-body">';
                            li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>';
                            li += '<span>' + new_offer.date + ' / ' + new_offer.company + ' / ' + new_offer.address + '</span>';
                            li += '<p>' + new_offer.description + '</p>';
                            li += '</div>';
                            li += '</li>';
                        });
                    });
                    document.getElementById("offers").innerHTML = li;
                }
            }
        });

        xhr.open("GET", ws_url);
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send();
    }
};

document.onreadystatechange = function () {
    "use strict";
    if (document.readyState === "interactive") {
        jobfinder.init();
    }

}
const jobfinder = {
    init: function () {
        this.computrabajo();
    },
    computrabajo: function () {
        "use strict";
        const base_url = "https://www.computrabajo.cl";
        const ws_url = "http://localhost/personal/inicio/computrabajo/";
        let data = null;

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let response = JSON.parse(this.responseText);
                if (response.result) {
                    let li = '';
                    response.paginas.forEach(pagina => {
                        let parser = new DOMParser();
                        let html = parser.parseFromString(pagina, "text/html");
                        let offers_get = html.getElementById("p_ofertas").getElementsByClassName("bRS bClick");
                        Array.from(offers_get).forEach(offer => {
                            let new_offer = {
                                title: offer.getElementsByClassName("js-o-link")[0].innerHTML,
                                url: base_url + offer.getElementsByClassName("js-o-link")[0].getAttribute("href"),
                                company: offer.getElementsByClassName("empr")[0].innerHTML,
                                date: offer.getElementsByClassName("dO")[0].innerHTML,
                                img: (offer.getElementsByClassName("lazy")[0]) ? offer.getElementsByClassName("lazy")[0].dataset.original : "https://s.ct-stc.com/web/c/cl/img/logo_cl.png"
                            };
                            li += '<li class="media">';
                            li += '<img class="align-self-center mr-3" style="width: 10%;" src="' + new_offer.img + '" alt="' + new_offer.title + '">';
                            li += '<div class="media-body">';
                            li += '<h5 class="mt-0">' + new_offer.title + '</h5>';
                            li += 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.';
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

        xhr.send(data);
    }
};

document.onreadystatechange = function () {
    "use strict";
    if (document.readyState === "interactive") {
        jobfinder.init();
    }

}
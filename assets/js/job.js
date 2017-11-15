const jobfinder = {
    init: function () {
        Promise.all([
            this.get("http://localhost/personal/inicio/chiletrabajos/"),
            this.get("http://localhost/personal/inicio/computrabajo/"),
            this.get("http://localhost/personal/inicio/yapo/")
        ]).then(values => {
            Promise.all([
                this.chiletrabajos(values[0]),
                this.computrabajo(values[1]),
                this.computrabajo(values[2])
            ]).then(values => {
                document.getElementById("offers").innerHTML = values[0] + values[1]
            })
        }).catch(errors => {
            console.log(errors)
        })
    },
    get: function (url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.withCredentials = true

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let response = JSON.parse(this.responseText)
                    if (response.result) {
                        resolve(response.pages)
                    } else {
                        reject("No se encontraron datos.")
                    }

                }
            })

            xhr.open("GET", url)
            xhr.setRequestHeader("cache-control", "no-cache")

            xhr.send()
        })
    },
    chiletrabajos: function (pages) {
        return new Promise((resolve, reject) => {
            let li = ''
            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let offers_get = html.getElementsByClassName("col-sm-6 page-content mb30")[0].getElementsByClassName("jobs-item with-thumb encuentra__empleo--yellow")

                Array.from(offers_get).forEach(offer => {
                    let new_offer = {
                        title: offer.getElementsByClassName("title")[0].getElementsByTagName("b")[0].innerHTML,
                        url: offer.getElementsByClassName("title")[0].getElementsByTagName("a")[0].href,
                        company: offer.getElementsByClassName("meta")[0].innerHTML.trim(),
                        date: offer.getElementsByClassName("date")[0].innerHTML.replace(/span|<|>/g, "").replace("/", ""),
                        img: "https://s3.amazonaws.com/cht2/public/img/ch/featured.png",
                        address: offer.getElementsByClassName("meta")[0].innerHTML.trim(),
                        description: offer.getElementsByClassName("description")[0].innerHTML
                    }
                    li += '<li class="media">'
                    li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">'
                    li += '<div class="media-body">'
                    li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>'
                    li += '<span>' + new_offer.date + ' / ' + new_offer.company + ' / ' + new_offer.address + '</span>'
                    li += '<p>' + new_offer.description + '</p>'
                    li += '</div>'
                    li += '</li>'
                })
            })
            resolve(li)
        })
    },
    computrabajo: function (pages) {
        return new Promise((resolve, reject) => {
            let li = ''
            let base_url = "https://www.computrabajo.cl"
            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let offers_get = html.getElementById("p_ofertas").getElementsByClassName("bRS bClick")

                Array.from(offers_get).forEach(offer => {
                    let new_offer = {
                        title: offer.getElementsByClassName("js-o-link")[0].innerHTML,
                        url: base_url + offer.getElementsByClassName("js-o-link")[0].getAttribute("href"),
                        company: offer.getElementsByClassName("empr")[0].innerHTML,
                        date: offer.getElementsByClassName("dO")[0].innerHTML,
                        img: (offer.getElementsByClassName("lazy")[0]) ? offer.getElementsByClassName("lazy")[0].dataset.original : "https://s.ct-stc.com/web/c/cl/img/logo_cl.png",
                        address: offer.getElementsByClassName("w_100 fl mtb5 lT")[0].getElementsByTagName("span")[5].getElementsByTagName("a")[0].innerHTML + " - " + offer.getElementsByClassName("w_100 fl mtb5 lT")[0].getElementsByTagName("span")[4].getElementsByTagName("a")[0].innerHTML,
                        description: offer.querySelector("p[itemprop='description']").innerHTML
                    }

                    li += '<li class="media">'
                    li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">'
                    li += '<div class="media-body">'
                    li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>'
                    li += '<span>' + new_offer.date + ' / ' + new_offer.company + ' / ' + new_offer.address + '</span>'
                    li += '<p>' + new_offer.description + '</p>'
                    li += '</div>'
                    li += '</li>'
                })
            })
            resolve(li)
        })
    },
    yapo: function (pages) {
        return new Promise((resolve, reject) => {
            let li = ''
            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let offers_get = html.getElementsByClassName("listing_thumbs")[0].getElementsByClassName("ad listing_thumbs")

                Array.from(offers_get).forEach(offer => {
                    let new_offer = {
                        title: offer.getElementsByClassName("title")[0].innerHTML,
                        url: offer.getElementsByClassName("title")[0].getAttribute("href"),
                        //company: offer.getElementsByClassName("empr")[0].innerHTML,
                        date: offer.getElementsByClassName("date")[0].innerHTML + " " + offer.getElementsByClassName("hour")[0].innerHTML,
                        img: "https://www.yapo.cl/img/transparent.gif",
                        address: offer.getElementsByClassName("region")[0].innerHTML + ", " + offer.getElementsByClassName("commune")[0].innerHTML,
                        description: ""
                    }

                    li += '<li class="media">'
                    li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">'
                    li += '<div class="media-body">'
                    li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>'
                    li += '<span>' + new_offer.date + ' / ' + new_offer.address + '</span>'
                    li += '<p>' + new_offer.description + '</p>'
                    li += '</div>'
                    li += '</li>'
                })
            })
            resolve(li)
        })
    }
}

jobfinder.init()
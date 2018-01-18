const jobfinder = {
    init: function () {
        Promise.all([
            this.get(location.href + "inicio/chiletrabajos/"),
            this.get(location.href + "inicio/computrabajo/"),
            this.get(location.href + "inicio/yapo/")
        ]).then(values => {
            Promise.all([
                this.chiletrabajos(values[0]),
                this.computrabajo(values[1]),
                this.yapo(values[2])
            ]).then(values => {
                document.getElementById("offers_chiletrabajos").innerHTML = values[0]
                document.getElementById("offers_computrabajo").innerHTML = values[1]
                document.getElementById("offers_yapo").innerHTML = values[2]
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
                        if (response.urls) {
                            resolve(response.urls)
                        } else {
                            reject("No se encontraron datos.")
                        }
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
            let offers = new Array()
            let meses = new Array(
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            )

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
                        realdate: null,
                        img: "https://s3.amazonaws.com/cht2/public/img/ch/featured.png",
                        address: offer.getElementsByClassName("meta")[0].innerHTML.trim(),
                        description: offer.getElementsByClassName("description")[0].innerHTML
                    }

                    /* Fecha */
                    let anio = new Date().getFullYear()
                    let mes = meses.findIndex(function (mes) {
                        return mes.substr(0, 3) === new_offer.date.replace(/[0-9]/g, "").replace(" ", "")
                    })
                    let dia = new_offer.date.replace(/[a-zA-Z]/g, "").replace(" ", "")

                    new_offer.realdate = (new Date(anio, mes, dia).getTime() <= new Date(anio, new Date().getDay(), new Date().getMonth()).getTime() ? new Date(anio, mes, dia) : new Date((anio - 1), mes, dia))

                    offers.push(new_offer)
                })
            })

            /*Ordenamiento por fecha */
            offers.sort(function (a, b) {
                return b.realdate - a.realdate
            })

            offers.forEach(new_offer => {
                li += '<li class="media">'
                li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">'
                li += '<div class="media-body">'
                li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>'
                li += '<span>' + new_offer.date + ' / ' + new_offer.company + ' / ' + new_offer.address + '</span>'
                li += '<p>' + new_offer.description + '</p>'
                li += '</div>'
                li += '</li>'
            })
            resolve(li)
        })
    },
    computrabajo: function (pages) {
        return new Promise((resolve, reject) => {
            let li = ''
            let offers = new Array()
            let base_url = "https://www.computrabajo.cl"
            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let offers_get = html.getElementById("p_ofertas").getElementsByClassName("bRS bClick")
                if (offers_get.length) {
                    Array.from(offers_get).forEach(offer => {
                        let new_offer = {
                            title: offer.getElementsByClassName("js-o-link")[0].innerHTML,
                            url: base_url + offer.getElementsByClassName("js-o-link")[0].getAttribute("href"),
                            company: (offer.querySelector('span[itemprop="hiringOrganization"]').querySelector('span[itemprop="name"]').querySelector('a') ? offer.querySelector('span[itemprop="hiringOrganization"]').querySelector('span[itemprop="name"]').querySelector('a').innerHTML : offer.querySelector('span[itemprop="hiringOrganization"]').querySelector('span[itemprop="name"]').innerHTML),
                            date: offer.getElementsByClassName("dO")[0].innerHTML,
                            realdate: null,
                            img: (offer.getElementsByClassName("lazy")[0]) ? offer.getElementsByClassName("lazy")[0].dataset.original : "https://s.ct-stc.com/web/c/cl/img/logo_cl.png",
                            address: offer.getElementsByClassName("w_100 fl mtb5 lT")[0].querySelector('span[itemprop="addressRegion"]').getElementsByTagName("a")[0].innerHTML + " - " + offer.getElementsByClassName("w_100 fl mtb5 lT")[0].querySelector('span[itemprop="addressLocality"]').getElementsByTagName("a")[0].innerHTML,
                            description: offer.querySelector("p[itemprop='description']").innerHTML
                        }

                        /* Fecha */
                        let realdate = offer.querySelector("meta[itemprop='datePosted']").content
                        realdate = realdate.split(" ")
                        realdate[0] = realdate[0].split("/")
                        realdate[1] = realdate[1].split(":")

                        let date_aux = new Date(realdate[0][2], realdate[0][1], realdate[0][0], realdate[1][0], realdate[1][1], realdate[1][2])
                        new_offer.realdate = date_aux

                        offers.push(new_offer)
                    })
                }
            })

            /*Ordenamiento por fecha */
            offers.sort(function (a, b) {
                return b.realdate - a.realdate
            })

            offers.forEach(new_offer => {
                li += '<li class="media">'
                li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">'
                li += '<div class="media-body">'
                li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>'
                li += '<span>' + new_offer.date + ' / ' + new_offer.company + ' / ' + new_offer.address + '</span>'
                li += '<p>' + new_offer.description + '</p>'
                li += '</div>'
                li += '</li>'
            })
            resolve(li)
        })
    },
    yapo: function (pages) {
        return new Promise((resolve, reject) => {
            let li = ''
            let offers = new Array()
            let meses = new Array(
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            )
            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let offers_get = html.getElementsByClassName("listing_thumbs")[0].getElementsByClassName("ad listing_thumbs")
                if (html.getElementsByClassName("FailoverMessageBox")[0] === undefined) {
                    Array.from(offers_get).forEach(offer => {
                        let new_offer = {
                            title: offer.getElementsByClassName("title")[0].innerHTML,
                            url: offer.getElementsByClassName("title")[0].getAttribute("href"),
                            //company: offer.getElementsByClassName("empr")[0].innerHTML,
                            date: offer.getElementsByClassName("date")[0].innerHTML,
                            img: (offer.getElementsByClassName("da_image")[0].getElementsByClassName("image")[0].src.includes("/img/transparent.gif") ? "https://www.yapo.cl/img/home_yapo_logo.png" : offer.getElementsByClassName("da_image")[0].getElementsByClassName("image")[0].src),
                            address: offer.getElementsByClassName("region")[0].innerHTML + ", " + offer.getElementsByClassName("commune")[0].innerHTML,
                            description: "",
                            realdate: null
                        }

                        /* Fecha */
                        let anio = new Date().getFullYear()
                        let mes = meses.findIndex(function (mes) {
                            return mes.substr(0, 3) === new_offer.date.replace(/[0-9]/g, "").replace(" ", "")
                        })
                        let dia = new_offer.date.replace(/[a-zA-Z]/g, "").replace(" ", "")
                        new_offer.realdate = (new Date(anio, mes, dia).getTime() <= new Date(anio, new Date().getDay(), new Date().getMonth()).getTime() ? new Date(anio, mes, dia) : new Date((anio - 1), mes, dia))

                        offers.push(new_offer)
                    })

                    /*Ordenamiento por fecha */
                    offers.sort(function (a, b) {
                        return b.realdate - a.realdate
                    })
                }
            })

            offers.forEach(new_offer => {
                li += '<li class="media">'
                li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">'
                li += '<div class="media-body">'
                li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>'
                li += '<span>' + new_offer.date + ' / ' + new_offer.address + '</span>'
                li += '<p>' + new_offer.description + '</p>'
                li += '</div>'
                li += '</li>'
            })
            resolve(li)
        })
    }
}

jobfinder.init()
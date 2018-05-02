const computrabajo = {
    process: function (pages) {
        return new Promise((resolve, reject) => {
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
                            company: offer.getElementsByClassName("it-blank")[0].innerHTML.trim(),
                            date: computrabajo.date(offer.getElementsByClassName("dO")[0].innerHTML),
                            img: (offer.getElementsByClassName("lazy")[0]) ? offer.getElementsByClassName("lazy")[0].dataset.original : "https://s.ct-stc.com/web/c/cl/img/logo_cl.png",
                            address: offer.getElementsByClassName("w_100 fl mtb5 lT")[0].querySelector('span[itemprop="addressRegion"]').getElementsByTagName("a")[0].innerHTML + " - " + offer.getElementsByClassName("w_100 fl mtb5 lT")[0].querySelector('span[itemprop="addressLocality"]').getElementsByTagName("a")[0].innerHTML
                        }

                        if (offers.map(function (e) { return e.url }).indexOf(new_offer.url) === -1) offers.push(new_offer)
                    })
                }
            })

            /*Ordenamiento por fecha */
            offers.sort(function (a, b) {
                return b.date - a.date
            })

            if (offers.length > 0) {
                resolve(offers)
            } else {
                reject("No hay ofertas en Computrabajo.")
            }
        })
    },
    /**
     * Procesa la fecha y retorna una mas trabajable.
     * La variable raw_date queda en un array similar a ['26', 'abril'] a partir de una fecha tipo '26 abril'.
     */
    date: function (raw_date) {
        raw_date = raw_date.split(" ")
        let day
        let month
        let year
        let hour
        let minutes
        let date
        if (raw_date.length === 2) {
            day = parseInt(raw_date[0])
            day = (day < 10 ? "0" + day : day.toString())
            month = meses.findIndex(function (mes) {
                return mes.toLowerCase() == raw_date[1]
            }) + 1
            month = (month < 10 ? "0" + month : month.toString())
            date = moment(new Date().getFullYear().toString() + month + day, "YYYYMMDD").valueOf()
            if (date > moment().valueOf()) date = moment(new Date().getFullYear().toString() + month + day, "YYYYMMDD").subtract(1, "years").valueOf()
        } else {
            day = (new Date().getUTCDate() < 10 ? "0" + new Date().getUTCDate() : new Date().getUTCDate().toString())
            month = new Date().getMonth() + 1
            month = (month < 10 ? "0" + month : month.toString())
            hour_aux = raw_date[1].split(":")
            hour = hour_aux[0]
            minutes = hour_aux[1]
            if (raw_date[0] == "Hoy,") {
                date = moment(new Date().getFullYear().toString() + month + day + hour + minutes, "YYYYMMDDHHmm").valueOf()
            }
            if (raw_date[0] == "Ayer,") {
                date = moment(new Date().getFullYear().toString() + month + day + hour + minutes, "YYYYMMDDHHmm").subtract(1, "days").valueOf()
            }
            if (date > moment().valueOf()) date = moment(new Date().getFullYear().toString() + month + day + hour + minutes, "YYYYMMDDHHmm").subtract(1, "years").valueOf()
            if (raw_date[2] == "pm" && parseInt(hour) < 12) date = moment(new Date().getFullYear().toString() + month + day + hour + minutes, "YYYYMMDDHHmm").add(12, "hours").valueOf()
        }
        return date
    }
}
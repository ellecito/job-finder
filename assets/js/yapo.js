const yapo = {
    process: function (pages) {
        return new Promise((resolve, reject) => {
            let offers = new Array()
            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let offers_get = html.getElementsByClassName("listing_thumbs")[0].getElementsByClassName("ad listing_thumbs")

                if (html.getElementsByClassName("FailoverMessageBox")[0] === undefined) {
                    Array.from(offers_get).forEach(offer => {
                        let new_offer = {
                            title: offer.getElementsByClassName("title")[0].innerHTML,
                            url: offer.getElementsByClassName("title")[0].getAttribute("href"),
                            company: 'Yapo',
                            date: yapo.date(offer.getElementsByClassName("date")[0].innerHTML + " " + offer.getElementsByClassName("hour")[0].innerHTML),
                            img: (offer.getElementsByClassName("da_image")[0].getElementsByClassName("image")[0].src.includes("/img/transparent.gif") ? "https://www.yapo.cl/img/home_yapo_logo.png" : offer.getElementsByClassName("da_image")[0].getElementsByClassName("image")[0].src),
                            address: offer.getElementsByClassName("region")[0].innerHTML + ", " + offer.getElementsByClassName("commune")[0].innerHTML
                        }
                        if (offers.map(function (e) { return e.url }).indexOf(new_offer.url) === -1) offers.push(new_offer)
                    })

                    /*Ordenamiento por fecha */
                    offers.sort(function (a, b) {
                        return b.date - a.date
                    })
                }
            })

            if (offers.length > 0) {
                resolve(offers)
            } else {
                reject("No hay ofertas en Chiletrabajos.")
            }
        })
    },
    /**
     * Procesa la fecha y retorna una mas trabajable.
     * La variable raw_date queda en un array similar a [2, 'Nov', 10, 12] a partir de una fecha tipo '2 Nov 10:12'.
     */
    date: function (raw_date) {
        raw_date = raw_date.split(" ")
        let day
        let month
        let year
        let hour
        let minutes
        let seconds
        if (raw_date.length > 2) {
            day = parseInt(raw_date[0])
            month = meses.findIndex(function (mes) {
                return mes.substr(0, 3) === raw_date[1]
            })
            year = (new Date(new Date().getFullYear(), month, day).getTime() <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getUTCDate()).getTime() ? new Date().getFullYear() : new Date().getFullYear() - 1)
            raw_date = raw_date[2].split(":")
            hour = parseInt(raw_date[0])
            minutes = parseInt(raw_date[1])
            seconds = 00
        } else {
            day = new Date().getUTCDate()
            month = new Date().getMonth()
            year = new Date().getFullYear()
            raw_date = raw_date[1].split(":")
            hour = parseInt(raw_date[0])
            minutes = parseInt(raw_date[1])
            seconds = 00
        }
        return new Date(year, month, day, hour, minutes, seconds).getTime()
    }
}
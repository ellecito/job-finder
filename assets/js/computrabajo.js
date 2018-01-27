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
                            company: (offer.querySelector('span[itemprop="hiringOrganization"]').querySelector('span[itemprop="name"]').querySelector('a') ? offer.querySelector('span[itemprop="hiringOrganization"]').querySelector('span[itemprop="name"]').querySelector('a').innerHTML : offer.querySelector('span[itemprop="hiringOrganization"]').querySelector('span[itemprop="name"]').innerHTML),
                            date: computrabajo.date(offer.querySelector("meta[itemprop='datePosted']").content),
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
                reject("No hay ofertas en Chiletrabajos.")
            }
        })
    },
    /**
     * Procesa la fecha y retorna una mas trabajable.
     * La variable raw_date es una fecha tipo '26/01/2018 14:52:00'.
     */
    date: function (raw_date) {
        raw_date = raw_date.split(" ")
        let date = raw_date[0].split("/")
        let time = raw_date[1].split(":")

        let day = parseInt(date[0])
        let month = parseInt(date[1]) - 1
        let year = parseInt(date[2])
        let hour = parseInt(time[0])
        let minutes = parseInt(time[1])
        let seconds = parseInt(time[2])

        return new Date(year, month, day, hour, minutes, seconds).getTime()
    }
}
const trabajando = {
    process: function (pages) {
        return new Promise((resolve, reject) => {
            let offers = new Array()
            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let offers_get = html.getElementsByClassName("pagination1")[0].getElementsByClassName("oferta_item")
                if (offers_get.length > 0) {
                    Array.from(offers_get).forEach(offer => {
                        let new_offer = {
                            title: offer.querySelector('[itemprop="title"]').getElementsByTagName('a')[0].innerHTML,
                            url: offer.querySelector('[itemprop="title"]').getElementsByTagName('a')[0].href,
                            company: offer.querySelector('[itemprop="hiringOrganization"]').innerHTML,
                            date: trabajando.date(offer.querySelector('[itemprop="datePosted"]').innerHTML),
                            img: offer.getElementsByClassName('img_holder')[0].getElementsByTagName('img')[0].src,
                            address: offer.querySelector('[itemprop="jobLocation"]').innerHTML
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
        raw_date = raw_date.split("/")
        let day
        let month
        let year
        let hour
        let minutes
        let seconds
        day = parseInt(raw_date[0])
        month = parseInt(raw_date[1]) - 1
        year = parseInt(raw_date[2])
        hour = 00
        minutes = 00
        seconds = 00
        return new Date(year, month, day, hour, minutes, seconds).getTime()
    }
}
const chiletrabajos = {
    process: function (pages) {
        return new Promise((resolve, reject) => {
            let offers = new Array()

            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let cant_offers = parseInt(html.getElementsByClassName('titulo title-lines')[0].getElementsByTagName('h2')[0].innerHTML.replace(/[^0-9]/g, ''))
                if (cant_offers > 0) {
                    let offers_get = html.getElementsByClassName("col-sm-6 page-content mb30")[0].getElementsByClassName("jobs-item with-thumb encuentra__empleo--yellow")

                    Array.from(offers_get).forEach(offer => {
                        let new_offer = {
                            title: offer.getElementsByClassName("title")[0].getElementsByTagName("b")[0].innerHTML,
                            url: offer.getElementsByClassName("title")[0].getElementsByTagName("a")[0].href,
                            company: offer.getElementsByClassName("meta")[0].innerHTML.trim(),
                            date: chiletrabajos.date(offer.getElementsByClassName("date")[0].innerHTML.replace(/span|<|>/g, "").replace("/", "")),
                            img: "https://s3.amazonaws.com/cht2/public/img/ch/featured.png",
                            address: offer.getElementsByClassName("meta")[0].innerHTML.trim()
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
     * La variable raw_date queda en un array similar a [2, 'Nov', 10, 12] a partir de una fecha tipo '2 Nov'.
     */
    date: function (raw_date) {
        raw_date = raw_date.split(" ")
        let day = parseInt(raw_date[0])
        let month = meses.findIndex(function (mes) {
            return mes.substr(0, 3) === raw_date[1]
        })
        let year = (new Date(new Date().getFullYear(), month, day).getTime() <= new Date(new Date().getFullYear(), new Date().getDay(), new Date().getMonth()).getTime() ? new Date().getFullYear() : new Date().getFullYear() - 1)
        let hour = 00
        let minutes = 00
        let seconds = 00

        return new Date(year, month, day, hour, minutes, seconds).getTime()
    }
}
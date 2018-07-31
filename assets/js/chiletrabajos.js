const chiletrabajos = {
    process: function (pages) {
        return new Promise((resolve, reject) => {
            let offers = new Array()

            pages.forEach(pages => {
                let parser = new DOMParser()
                let html = parser.parseFromString(pages, "text/html")
                let cant_offers = parseInt(html.getElementsByClassName('titulo title-lines')[0].getElementsByTagName('h2')[0].innerHTML.replace(/[^0-9]/g, ''))
                if (cant_offers > 0) {
                    let offers_get = html.getElementsByClassName("col-sm-6 page-content mb30")[0].getElementsByClassName("job-item")
                    Array.from(offers_get).forEach(offer => {
                        let new_offer = {
                            title: offer.getElementsByClassName("title")[0].getElementsByTagName("a")[0].innerHTML,
                            url: offer.getElementsByClassName("title")[0].getElementsByTagName("a")[0].href,
                            company: offer.getElementsByClassName("meta")[0].innerHTML.trim(),
                            date: chiletrabajos.date(offer.getElementsByClassName("meta")[1].innerHTML.replace(/<\/?[^>]+(>|$)/g, "").replace(",", "").trim()),
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
     * La variable raw_date queda en un array similar a ["17", "de", "", "Julio", "de", "2018"] a partir de una fecha tipo '25 de  Julio de 2018
'.
     */
    date: function (raw_date) {
        raw_date = raw_date.split(" ")
        let day = raw_date[0]
        let month = meses.findIndex(function (mes) {
            return mes.toLowerCase() == raw_date[3].toLowerCase()
        }) + 1
        month = (month < 10 ? "0" + month : month.toString())
        let year = raw_date[5]
        let date = moment(year + month + day, "YYYYMMDD").valueOf()
        return date
    }
}
const jobfinder = {
    init: function () {
        noty = new Noty({
            type: 'information',
            layout: 'topCenter',
            text: 'Buscando ofertas...'
        }).show()

        this.get(webservices.chiletrabajos).then(pages => {
            chiletrabajos.process(pages).then(offers => {
                this.set(offers, 'offers_chiletrabajos')
                new Noty({
                    type: 'success',
                    layout: 'topCenter',
                    text: 'Se encontraron ' + offers.length + " ofertas en Chiletrabajos",
                    timeout: 2000
                }).show()
                noty.close()
            }).catch(error => {
                console.error(error)
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    text: 'Error al conectar con Chiletrabajos',
                    timeout: 2000
                }).show()
                noty.close()
            })
        }).catch(error => {
            console.error(error)
            new Noty({
                type: 'error',
                layout: 'topCenter',
                text: 'Error al conectar con Chiletrabajos',
                timeout: 2000
            }).show()
            noty.close()
        })

        this.get(webservices.computrabajo).then(pages => {
            computrabajo.process(pages).then(offers => {
                this.set(offers, 'offers_computrabajo')
                new Noty({
                    type: 'success',
                    layout: 'topCenter',
                    text: 'Se encontraron ' + offers.length + " ofertas en Computrabajo",
                    timeout: 2000
                }).show()
                noty.close()
            }).catch(error => {
                console.error(error)
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    text: 'Error al conectar con Computrabajo',
                    timeout: 2000
                }).show()
                noty.close()
                console.error(error)
            })
        }).catch(error => {
            console.error(error)
            new Noty({
                type: 'error',
                layout: 'topCenter',
                text: 'Error al conectar con Computrabajo',
                timeout: 2000
            }).show()
            noty.close()
        })

        this.get(webservices.yapo).then(pages => {
            yapo.process(pages).then(offers => {
                this.set(offers, 'offers_yapo')
                new Noty({
                    type: 'success',
                    layout: 'topCenter',
                    text: 'Se encontraron ' + offers.length + " ofertas en Yapo",
                    timeout: 2000
                }).show()
                noty.close()
            }).catch(error => {
                console.error(error)
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    text: 'Error al conectar con Yapo',
                    timeout: 2000
                }).show()
                noty.close()
            })
        }).catch(error => {
            console.error(error)
            new Noty({
                type: 'error',
                layout: 'topCenter',
                text: 'Error al conectar con Yapo',
                timeout: 2000
            }).show()
            noty.close()
        })

        this.get(webservices.trabajando).then(pages => {
            trabajando.process(pages).then(offers => {
                this.set(offers, 'offers_trabajando')
                new Noty({
                    type: 'success',
                    layout: 'topCenter',
                    text: 'Se encontraron ' + offers.length + " ofertas en Trabajando",
                    timeout: 2000
                }).show()
                noty.close()
            }).catch(error => {
                console.error(error)
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    text: 'Error al conectar con Trabajando',
                    timeout: 2000
                }).show()
                noty.close()
            })
        }).catch(error => {
            console.error(error)
            new Noty({
                type: 'error',
                layout: 'topCenter',
                text: 'Error al conectar con Trabajando',
                timeout: 2000
            }).show()
            noty.close()
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
    set: function (offers, id) {
        let li = ''
        offers.forEach(new_offer => {
            li += '<li class="media">'
            li += '<img class="align-self-center mr-3" src="' + new_offer.img + '" alt="' + new_offer.title + '">'
            li += '<div class="media-body">'
            li += '<h5 class="mt-0"><a href="' + new_offer.url + '" target="_blank">' + new_offer.title + '</a></h5>'
            li += '<span>' + moment(new_offer.date).format('LLLL') + ' / ' + new_offer.company + ' / ' + new_offer.address + '</span>'
            li += '</div>'
            li += '</li>'
            li += '</br>'
        })
        document.getElementById(id).innerHTML = li
    }
}

window.onload = function () {
    jobfinder.init()
}
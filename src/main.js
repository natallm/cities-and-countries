const provinceHeadings = document.querySelectorAll("#provinces > .province h1[data-province]")
const provinceDestinations = Array.from(provinceHeadings).map(heading => heading.querySelector("a"))

for (const destination of provinceDestinations) {
    if (destination == null) continue
    destination.addEventListener("click", function (ev) {
        if (!sessionStorage["toll_paid:" + destination.parentElement.dataset.province]) tollPlazaChallenge(ev, destination.parentElement.dataset.province)
    })
}

/**
 * ssfdassdsad
 * @param {PointerEvent} event 
 */
async function tollPlazaChallenge(event, province) {
    if (!(event.target instanceof HTMLAnchorElement)) throw new Error("not an anchor element")

    event.preventDefault()

    const tollwayRequest = await fetch("/tollway/index.html")
    const tollwayPage = await tollwayRequest.text()
    const tollwayTemplate = new DOMParser().parseFromString(tollwayPage, "text/html").head.getElementsByTagName("template")[0].content.cloneNode(true)

    // i hope the script survives this
    while (document.body.lastChild) {
        document.body.lastChild.remove()
    }

    //it survived :)
    document.body.append(tollwayTemplate)

    document.body.querySelector(".pay-button").addEventListener("click", () => {
        sessionStorage["toll_paid:" + province] = true
        location.href = event.target.href
    })
}
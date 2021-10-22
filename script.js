const billings = [
    { pv: "10k", p: 8 },
    { pv: "50k", p: 12 },
    { pv: "100k", p: 16 },
    { pv: "500k", p: 24 },
    { pv: "1M", p: 36 }
]

let yearlyBilling = false
let pvc = "10k"
let pc = 8
let cpc = 0

const pageViewsNode = document.querySelector(".number-wrapper")
const dollazNode = document.querySelector(".dollas-number-wrapper")

const billingPickerNode = document.querySelector(".picker")

const body = document.querySelector("body")
const slider = document.querySelector(".slider-wrapper")
const bar = document.querySelector(".full-slider-bar")
const handle = slider.querySelector(".slider-thingy")

let draggedNode = null

const renderData = () => {
    pageViewsNode.textContent = pvc
    dollazNode.textContent = (yearlyBilling ? pc * .75 : pc).toFixed(2)
    yearlyBilling ? billingPickerNode.classList.add("selected") : billingPickerNode.classList.remove("selected")
    const step = Math.round(slider.getBoundingClientRect().width / 4)
    handle.style.left = (step * cpc - 20) + "px"
    bar.style.width = step * cpc + "px"
}

billingPickerNode.addEventListener("click", () => {
    yearlyBilling = !yearlyBilling
    renderData()
})

const handleDrag = e => {
    e.preventDefault()
    if(draggedNode !== handle) return
    // quick maths
    const sw = slider.getBoundingClientRect().width
    // gl debugging :)
    const cp = Math.min(Math.max(Math.floor(((e.clientX || e.changedTouches[0].clientX) - (body.clientWidth - sw) / 2) / Math.round(sw / 5)), 0), 4)
    let { p, pv } = billings[cp]
    if (p !== pc) [pc, pvc, cpc] = [p, pv, cp], renderData()
}

document.addEventListener("dragstart", e => draggedNode = e.target)
document.addEventListener("touchstart", e => draggedNode = e.target)
document.addEventListener("dragover", e => handleDrag(e))
document.addEventListener("touchmove", e => handleDrag(e))

// init

renderData()

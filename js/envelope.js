document.addEventListener("DOMContentLoaded", () => {
    const heartButton = document.querySelector(".heart")
    const envelope = document.querySelector(".envelope")
    const envelopeFlap = document.querySelector(".envelope-flap")

    heartButton.addEventListener("click", () => {
        envelope.classList.toggle("active")
        envelopeFlap.classList.toggle("active")
        heartButton.classList.toggle("active")
        letter.classList.add('opening')
        setTimeout(() => {
            letter.classList.remove('opening')
            letter.classList.add('opened')
        }, 800)
    })
})
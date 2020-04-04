const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const $locationButton = document.querySelector('#location-button')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""

    fetch("/weather?address="+location).then( (response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location

            messageTwo.textContent = data.foreCastData
        }
    })
})
})


$locationButton.addEventListener('click', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""

    if(!navigator.geolocation) {
        return alert('Geolocation not available.')
    }
    
    navigator.geolocation.getCurrentPosition((position) => {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        fetch(`/weatherCords?latitude=${latitude}&longitude=${longitude}`).then( (response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                }
                else{
                    messageOne.textContent = data.location
        
                    messageTwo.textContent = data.foreCastData
                }
            })
        })
    })
})


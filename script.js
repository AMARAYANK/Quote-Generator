const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterbtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Show Loading
console.log('loader', loader)
function showLoadingSpinner(){
    console.log(loader.hidden)
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        console.log(loader.hidden)
       quoteContainer.hidden = false
       loader.hidden = true
    }
}

// Get Quote from API

async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = 'https://gentle-harbor-57997.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        // If Author is blank, add 'Unknow'
        console.log(data)
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor
        }
        // Reduce font size for long quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText 
        // Stop loader, Show Quote
        removeLoadingSpinner()    
    } catch (error) {
      getQuote()
      console.log(error)
    }
}

// Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners

newQuoteBtn.addEventListener('click', getQuote)
twitterbtn.addEventListener('click', tweetQuote)

// On Load
getQuote();

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let fetchCounter = 0;

async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://desolate-reef-65722.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteText.length > 120)
            quoteText.classList.add('long-quote');
        else
            quoteText.classList.remove('long-quote');
        quoteText.innerText = data.quoteText;
        authorText.innerText = data.quoteAuthor === '' ? 'Anonymous' : data.quoteAuthor;
        removeLoadingSpinner();
    } catch(error) {
        fetchCounter++;
        if (fetchCounter < 5) {
            getQuote();
        } else {
            fetchCounter = 0;
            setTimeout(getQuote, 1000);
        }
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();

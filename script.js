// window.console.log('DATA') 
// If we are calling an API and want to see how data is formatted

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
// Make sure IDs match the ones in HTML



// Global declaration of apiQuotes  
let apiQuotes = [];

// GETTING QUOTES FROM OUTSIDE SOURCE
// Show new Quote function:
function newQuote(){
    i  = Math.floor(apiQuotes.length *Math.random());
    const quote = apiQuotes[i];
    // console.log(quote);
    // Giving text content equal to the object text and author by referencing to it

    // Checking for blank author name
    if (quote.author == null) {
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    
    // Checking for long quote
    if (quote.text.length >120) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}


// Asynchronous function: Runs and won't stop during the loading of the webpage

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    // TRY CATCH STATEMENT: Uses the fetch request, if error pertains a catch call can be done to judge and resolve bugs
    try {
        // The statement ensures that constant wont be populated until the url is fetched; await!
        const response = await fetch(apiUrl);
        // Getting JSON from API as response, turning it to JSON object and pass that to a global variable
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
        // Handle error here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}- ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On load
getQuotes();
// The console.log(apiQuotes) actually shows that the array is stored within the apiQuotes


/*
// GETTING QUOTES FROM INTERNAL SOURCE
function newQuote(){
    const quote = localQuotes[Math.floor(Math.random()*localQuotes.length)]
    console.log(quote)
}
newQuote();
*/
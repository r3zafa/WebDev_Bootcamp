const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');
tweetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // this pervent form from submit information to 
    // another page or refresh page

    // const usernameInput = document.querySelectorAll('input')[0];
    // const tweetInput = document.querySelectorAll('input')[1];


    // using element properties in form. make life easier ;)
    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;

    addTweet(usernameInput.value, tweetInput.value)

    // reset the inputs
    usernameInput.value = '';
    tweetInput.value = '';
});

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username)
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`)
    tweetsContainer.append(newTweet);
}
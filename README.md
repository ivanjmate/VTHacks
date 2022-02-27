## Tweetle
Guess the missing word from a list of random Tweets in a simple and easy word-guessing game.

## Inspiration
Wordle is a super huge hit recently, so our team decided to take inspiration from the web game and add our own little twist to it by creating Tweetle! Rather than guess random words, we added an extra layer which involves tweets, where the user will have to figure out what the missing word in a tweet is. Since both members were relatively new to Hackathons, we didn't want to choose anything overly ambitious at first, and the idea seemed fun and relatively simple. Plus, we got to pick some funny tweets to include  as well!

## What it does
The user is given an image of a tweet and has to figure out what the missing word in the tweet is. Currently, our implementation supports words between four to seven letters and the user has unlimited attempts to guess the word. An on-screen keyboard is also provided for the user to use. The keyboard and input boxes will change colors to indicate if the user is close to getting the correct word, and if they don't, the input box will refresh for the user to try again. Upon refreshing the page, a new tweet with a different missing word will be shown that the user can try to guess. 

## How we built it
Tweetle was built using HTML, CSS, and Javascript. The images were created using Photoshop to alter screenshots of tweets found online.

## Challenges we ran into
Some challenges we ran into were figuring out how to add different images and word lengths. Doing one word length seemed easy, but we wanted to add various word lengths for more variety, and because many tweets don't have words of a certain length. Another challenge was trying to create dictionaries for each word length we wanted to include. We initially tried to create text files to hold all the words for each word length, as well as using a JSON file, but both exceeded the amount of time and knowledge we had.

## Accomplishments that we're proud of
As new hackers, we were both proud to be able to create something that actually worked in time for submission. We're proud of creating something that we hope is fun, but also showcases how much we learned during the Hackathon. We're also proud of actually having time to rest and not having to pull an all-nighter to finish, since health is important too.

## What we learned
Both of us had little experience using HTML, CSS, and Javascript before this Hackathon, and we mostly wanted to learn more by creating a site using these languages. We learned a lot through many videos, tutorials, and always Stack Overflow. In particular, we learned how to dynamically add and remove divs, how functions work in javascript, and how to utilize CSS to change the layout.

## What's next for Tweetle
For Tweetle, we hope to be able to stay up-to-date with some popular tweets and news by adding a larger pool of tweets to our bank. We also hope to eventually add expansion for more word lengths. Currently, there is not a way to see what the last input for a word was when it is wrong, so adding a way to see previous words inputted is another item on our list. Part of our original idea was also to have multiple words missing that the user would have to guess, so adding that implementation would make it harder and more interesting.

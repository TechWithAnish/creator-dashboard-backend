const { fetchTweets } = require('./twitter');

     fetchTweets('technology')
       .then(posts => console.log('Tweets:', posts))
       .catch(err => console.error('Error:', err));
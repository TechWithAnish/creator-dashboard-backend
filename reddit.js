const snoowrap = require('snoowrap');
require('dotenv').config();

const r = new snoowrap({
  userAgent: 'vertx-app',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

let cachedPosts = [];
let lastFetch = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const fetchRedditPosts = async (subreddit = 'technology') => {
  try {
    if (Date.now() - lastFetch < CACHE_DURATION && cachedPosts.length > 0) {
      console.log('Returning cached Reddit posts');
      return cachedPosts;
    }
    const posts = await r.getSubreddit(subreddit).getHot({ limit: 10 });
    cachedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      url: post.url,
      source: 'Reddit',
    }));
    lastFetch = Date.now();
    console.log('Fetched Reddit posts:', cachedPosts.length);
    return cachedPosts;
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    if (error.statusCode === 429) {
      console.error('Reddit rate limit exceeded. Try again after:', new Date(error.response?.headers['x-ratelimit-reset'] * 1000));
    }
    return [];
  }
};

module.exports = { fetchRedditPosts };
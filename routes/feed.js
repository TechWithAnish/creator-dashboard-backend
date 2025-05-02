const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    // Fetch Reddit posts
    let redditPosts = [];
    try {
      const redditResponse = await axios.get('https://www.reddit.com/r/technology.json');
      redditPosts = redditResponse.data.data.children.map(post => ({
        title: post.data.title,
        source: 'Reddit',
      })).slice(0, 10);
      console.log('Reddit posts fetched:', redditPosts.length);
    } catch (redditError) {
      console.error('Error fetching Reddit posts:', redditError.message);
    }

    // Fetch NewsAPI (TechCrunch) posts
    let techCrunchPosts = [];
    try {
      const newsApiResponse = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.NEWSAPI_KEY}`);
      techCrunchPosts = newsApiResponse.data.articles.map(article => ({
        title: article.title,
        source: 'TechCrunch',
      })).slice(0, 10);
      console.log('TechCrunch posts fetched:', techCrunchPosts.length);
    } catch (newsApiError) {
      console.error('Error fetching TechCrunch posts:', newsApiError.message);
      console.error('NewsAPI Key used:', process.env.NEWSAPI_KEY);
    }

    // Combine Reddit and TechCrunch posts (mixed order)
    const combinedPosts = [...redditPosts, ...techCrunchPosts].slice(0, 20); // Limit to 20 total posts

    res.json(combinedPosts);
  } catch (err) {
    console.error('Error fetching feed:', err.message);
    res.status(500).json({ msg: 'Error fetching feed' });
  }
});

module.exports = router;
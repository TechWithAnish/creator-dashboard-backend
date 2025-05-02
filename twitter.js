const Parser = require('rss-parser');
     require('dotenv').config();

     const parser = new Parser();

     const fetchTweets = async (query = 'technology') => {
       try {
         console.log('Fetching RSS feed for:', query);
         const feed = await parser.parseURL('https://techcrunch.com/feed/');
         const results = feed.items.slice(0, 10).map(item => ({
           id: item.link,
           title: item.title,
           url: item.link,
           source: 'TechCrunch',
         }));
         console.log('RSS items fetched:', results.length);
         return results;
       } catch (error) {
         console.error('Error fetching RSS:', error);
         return [];
       }
     };

     module.exports = { fetchTweets };
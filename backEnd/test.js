const TikTokScraper = require('tiktok-scraper');
var app=require('express')();

app.get('/',function (req,res) {
    scrapme.then(data=>{
      res.json(data)
    }).catch(err=>{
        res.status(500).json(data);
    })    
})

app.get('/trend',function (req,res) {
    var data=[];
     return TikTokScraper.hashtag('ohnana').then(result=>{
         return res.send(result);
     })
})

app.get('/music',function (req,res) {
    var data=[];
     return TikTokScraper.music('6624126913629653766').then(result=>{
         return res.send(result);
     })
})

const scrapme = new Promise(function(resolve, reject) {
    var data=[];
    const hashtag = TikTokScraper.hashtagEvent("food", { number: 50});
    hashtag.on('data', json => {
        data.push(json)
    });
    hashtag.on('done', (json) => {
        resolve(data)
        
    });
    hashtag.on('error', error => {
        reject()
    });
    hashtag.scrape();

  });
  

  

app.listen(80);
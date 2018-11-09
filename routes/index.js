var express = require('express');
var router = express.Router();
var ytdl = require('youtube-dl');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Youtube Downloader' });
});

router.post('/video', function(req, res, next) {
// res.setHeader('Content-Type', 'application/json');
//res.send({ data: 'user created in db' });

  var url = req.body.url,
        formats = [];

    ytdl.getInfo(url, ['--youtube-skip-dash-manifest'], function(err, info) {
        if(err) return res.render('listvideo', {error: 'The link you provided either not a valid url or it is not acceptable'});

        // push all video formats for download (skipping audio)
        info.formats.forEach(function(item) {
            if(item.format_note !== 'DASH audio' && item.filesize) {
                item.filesize = item.filesize ? bytesToSize(item.filesize): 'unknown';
                formats.push(item);
            }
        });
        res.render('listvideo', {meta: {id: info.id, formats: formats}});
    });
});

// utility function to convert bytes to human readable.
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

module.exports = router;
// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');
var comments = require(commentsPath);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read comments from file
app.get('/comments', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Add comments to file
app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started: http://localhost:3000/');
});

let express = require('express');
let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

let countWords = (str) => {
 
  const wordPattern = /\b\w+\b/g;
  const matches = str.match(wordPattern);
  return matches ? matches.length : 0;
};


app.post('/Check', (req, res) => {
  let payload = req.body;
  
  
  if (payload && payload.str) {
    let receivedString = payload.str;

    
    let wordCount = countWords(receivedString);

    
    if (wordCount >= 8) {
      console.log('Received string:', receivedString);
      res.status(200).send({ data: 'String received successfully' });
    } else {
      res.status(400).send({ error: 'Not Acceptable' });
    }
  }
});


app.listen(3000, () => {
  console.log(`Running`);
});

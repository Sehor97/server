const express = require('express');
      app = express();
      morgan = require('morgan');
      bodyParser= require('body-parser');
      cors = require('cors');

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cors());

require('./routes/partnerRoute')(app);

app.listen(app.get('port'), ()=>{
    console.log('server corriendo en el puerto 3000');
});
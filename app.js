const Koa = require('koa');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const axios = require('axios');
const LRU = require('lru');

const app = new Koa();

app.use(compress());
app.use(helmet());
app.use(async (ctx) => {
  const lru = new LRU({ maxAge: 43200000 });

  if (!lru.get('fx')) {
    const fx = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.ACCESS_KEY}&format=1&base=USD`);

    lru.set('fx', fx.data);
  }

  const body = lru.get('fx');

  ctx.body = body;
});
app.listen(3000);

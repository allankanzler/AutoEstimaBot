const Twitter = require('twitter')
require('dotenv').config()

const Tweet = new Twitter({
  consumer_key:         process.env.BOT_CONSUMER_KEY,
  consumer_secret:      process.env.BOT_CONSUMER_SECRET,
  access_token_key:     process.env.BOT_ACESS_TOKEN,
  access_token_secret:  process.env.BOT_ACESS_TOKEN_SECRET,
})

function action(event){
  const {retweeted_status, id_str, screen_name, is_quote_status} = event;
  const {name} = event.user;

  if(!retweeted_status && !is_quote_status){ 
    console.log("Tweet " + `https:twitter.com/${screen_name}/status/${id_str}`) 
    Tweet.post('favorites/create', {id: id_str}, erro => { // Dar like no tweet
      if(erro){
        console.log("Erro no like: " + erro) 
        // Caso haja algum erro, jogar no console para verificarmos.
      }else {
        console.log("Tweet Likado. URL do Tweet: " + `https:twitter.com/${screen_name}/status/${id_str}`) 
        // Se der tudo certo, avisar no console com o URL do tweet original
      }
    })
    }
}
var stream = Tweet.stream('statuses/filter', {track: 'consigo'}) 
// Aqui dizemos para o programa verificar em modo streaming
stream.on('data', action) 
// Ao receber as informações (`data`), passar elas para a função action e chamar a mesma.
stream.on('error', erro => console.log("Erro: "+ erro)) 
// Caso haja algum erro, jogar o erro no console para verificarmos.
import {useEffect, useState} from 'react';
import './App.css';
import useSWR from "swr";

const fetcher =(...args)=> fetch(...args).then((res)=> res.json())

function App() {

  const [gameTitle,setGameTitle]= useState(" ");
  const [searchedGame,setSearchedGame]=useState([]);
 // const [deals,setDeals]=useState([]);

  const {data,error}=useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3 ', fetcher)
  const searchGame=()=>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`).then((res)=>
      res.json()
    ).then((data)=>{
      console.log(data);
      setSearchedGame(data);
    })

  }

 /* useEffect(()=>{
    fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3').then((res)=>res.json()).then((data)=>{
      setDeals(data);
      console.log(data);
    })
  },[]); */

  return (
    <div className="App">
      <div className='searchSection'>
        <h1>Search for a Game</h1>
        <input type="text" placeholder="Minecraft..." onChange={(event)=>{
          setGameTitle(event.target.value)
        }}/>
        <button onClick={searchGame}>Search Game</button>
        <div className='searchResults'>
          {searchedGame.map((game,key)=>{
            return(
            <div key={key} className='game'> {game.external} 

            <img src={game.thumb}/>
            <p>$ {game.cheapest}</p>
            
             </div>
            )

          })}
        </div>
      </div>
      <div className='detailSection'>
        <h1>Latest Deals</h1>
        <div className='greatDeals'>
          { data && data.map((deal,key)=>{
            return(
            <div className='deal' key={key}> 
            <h3>{deal.title}</h3>
            <img src={deal.thumb} />
            <p>Normal Price: ${deal.normalPrice}</p>
            <p>Sale Price: ${deal.salePrice}</p>
            <h4 >You Save {deal.savings.substr(0,2)}%</h4>
            
            
            </div>
            )
          })}
      </div>
      
    </div>
    </div>
  );
}

export default App;

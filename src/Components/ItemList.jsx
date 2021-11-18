import React, { useEffect, useState } from "react";
import '../App.css';
import axios from 'axios';
import {mergeStyleSets, Modal,DefaultButton,} from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';

function ItemList() {
  
  const [beerList, setBeerList] = useState([]);
  const [data, setData] = useState([])
  const [isOpen,setIsOpen] = useState(false);
  const [selectedBeer, setSelectedBeer] = useState({});
  const [beerVolume,setBeerVolume] = useState("")
  const [beerName,setBeerName] = useState("")

  useEffect(() => {
    axios.get(`https://api.punkapi.com/v2/beers`)
        .then(response => {
        setData(response.data)
        setBeerList(response.data)
    
        })
    .catch(error => {
      console.log("Axios error ecountered")
      error && console.log(error)
    }
      )
  }, [])

  function openModal(beer) {
    setIsOpen(true)
    setSelectedBeer(beer)
  }

  function closeModal(){
    setIsOpen(false)
  }

  function filterBeerName(e,value) {
   const list = data
   let newArray = list.filter(item => item.name.toLowerCase().includes(value, -1))
    setBeerList(newArray)
    setBeerName(value)
    setBeerVolume("")
  }

  function filterBeerVolume(e,value){
    const list = data
    let newArray = list.filter(item => item.abv > (value))
   setBeerList(newArray)
   setBeerVolume(value)
   setBeerName("")
   }
  
  function orderItem(){
    alert("I am sorry but we are out of stock at the moment, please check later")
  }

    return(  
    <div>
            <Modal
             isOpen={isOpen}
             containerClassName={contentStyles.container}
             onDismiss={closeModal}
            >
            <div style={{height:"62%"}} >
                  <h2 style={{textAlign:"center"}}> {selectedBeer.name}</h2>
                  <div style={{fontSize:"small",textAlign:"center"}}> {selectedBeer.tagline} </div>
                  <div style={{display:"flex", height:"70%", borderBottom:"solid 1px"}}>  
                    <img src={selectedBeer.image_url} alt="" className="imageSingle"/>
                    <div className="collumn-80-50">
                        <ul> 
                            <li>
                              Vol:{selectedBeer.abv}
                            </li>
                            <li>
                            Available since: {selectedBeer.first_brewed}
                            </li>
                            <li>
                              Brewer tips: {selectedBeer.brewers_tips}
                            </li>
                            {
                            selectedBeer.method && selectedBeer.method.fermentation &&
                            <li>
                              Fermentation done at: {selectedBeer.method.fermentation.temp.value}   {selectedBeer.method.fermentation.temp.unit}
                            </li>
                            }
                        </ul>
                        <div>
                          Short description: {selectedBeer.description}
                        </div>
                    </div>
                  </div>
                  <div style={{display:"flex"}}>
                      <h3 className="centerHalf"> Ingredients </h3>
                      <h3 className="centerHalf"> Food pairing </h3>
                  </div>
                  <div className="detailList">
                      <div>
                        <h4>Hops:</h4>
                          {selectedBeer.ingredients && selectedBeer.ingredients.hops.map((hops,index) =>
                            <div key={index}>
                              {hops.name}
                            </div>
                          )}
                        </div>
                        <div>
                        <h4> Malt:</h4>
                          {selectedBeer.ingredients && selectedBeer.ingredients.malt.map((malt,index) =>
                            <div key={index}>
                              {malt.name}
                            </div>
                          )}
                  </div>
                  <div>
                          {selectedBeer.food_pairing && selectedBeer.food_pairing.map((food,index) =>
                            <div key={index}>
                              {food}
                            </div>
                          )}  
                  </div>
                  </div>
                  
                  <div style={{display:"flex", placeContent:"space-between", margin:20}}>
                      <DefaultButton onClick={orderItem}>
                        Order
                      </DefaultButton>
                      <DefaultButton onClick={closeModal}>
                        Close
                      </DefaultButton >
                  </div>
            </div>
            </Modal>
            <div style={{display:"flex", placeContent:"center"}}>
            <TextField label="Search beer name:" name="beerName" value={beerName} onChange={filterBeerName} className="filterStyles" />
            <div style={{placeSelf:"center"}}>Or</div>
            <TextField label="Alcohol volume higher than:" name="beerVolume" value={beerVolume} onChange={filterBeerVolume} className="filterStyles" />
            </div>
            
            <div style={{margin:"30px", display:"flex", flexFlow:"wrap", placeContent:"center"}}>
                {beerList && beerList.map((beer) =>
                      <div 
                      key={beer.id}
                      className="itemBox"
                      onClick={(i) => openModal(beer)}
                      >  
                          <div>
                              <h4 style={{textAlign:"center", margin: "5px 5px"}}>{beer.name}</h4>
                              <div style={{textAlign:"center", fontSize:"small"}}>{beer.tagline}</div>
                              <img src={beer.image_url} alt="" className="imageStyle"/>
                              <div className="volumeBottom">Vol:{beer.abv? beer.abv : "N/A" }</div>
                          </div>  
                      </div>
                )}
            </div>
    </div>
    )
}
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    height:'80%',
    width:'60%'
  }
})
export default ItemList;


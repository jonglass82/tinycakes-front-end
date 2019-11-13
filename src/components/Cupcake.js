import React from 'react'
import axios from 'axios'

class Cupcake extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      base: "",
      frosting: "",
      toppings: [],
      bases: [],
      frostings: [],
      toppings: []
    }
  }

  getBases () {
    axios.get("http://localhost:4000/cupcakes/bases").then(res => {
      const bases = res.data.bases;
      this.setState((state, props) => ({
        bases: bases
      }));
      console.log(this.state.bases);
    })
  };

    getFrostings () {
    axios.get("http://localhost:4000/cupcakes/frostings").then(res => {
      const frostings = res.data.frostings;
      this.setState((state, props) => ({
        frostings: frostings
      }));
      console.log(this.state.frostings);
    })
  };

    getToppings () {
    axios.get("http://localhost:4000/cupcakes/toppings").then(res => {
      const toppings = res.data.toppings;
      this.setState((state, props) => ({
        toppings: toppings
      }));
      console.log(this.state.toppings);
    })
  };

  numberFormatter = (number) => {
    const format = number/100
    if(format >= 1){
      return format + ".00"
    }
    return format
  }

  componentDidMount () {
    this.getBases();
    this.getFrostings();
    this.getToppings();
  }

  placeOrder () {

    const order = {
      base: this.state.base,
      frosting: this.state.frosting, 
      toppings: this.state.toppings
    }

    axios.post('http://localhost:4000/cupcakes/orders', order).then(res =>{
      console.log(res.data);
    })
  }

  render () {
    return <div>

    <h1>Build Your Cupcake:</h1>

    <button onClick={this.placeOrder}>Place Order</button>

    <h1> Choose your base:</h1>
    
    {this.state.bases.map((base) => {
          return (
              <h2>{base.name} $ {this.numberFormatter(base.price)}</h2>
            )
      })}


          <h1> Choose your frosting:</h1>
    
    {this.state.frostings.map((frosting) => {
          return (
              <h2>{frosting.name} $ {this.numberFormatter(frosting.price)}</h2>
            )
      })}


          <h1> Choose your toppings:</h1>
    
    {this.state.toppings.map((topping) => {
          return (
              <h2>{topping.name} $ {topping.price/100}</h2>
            )
      })}

    </div>

    }
}

export default Cupcake
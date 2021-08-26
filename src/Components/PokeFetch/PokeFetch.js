import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10,
      timeout: 0,
    }
  }

  

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .then(
        this.interval = setInterval(() => {
          this.setState({
            timer: this.state.timer -1
          })
          if (this.state.timer < 0) {clearInterval(this.interval);
          this.setState({
            timer: 10
          })
        }
        }, 1000)
      )
      .catch((err) => console.log(err))
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }
  


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Can You Guess 'em All?! <br></br> {this.state.timer}</h1>
        <div className={'pokeWrap'}>
          {this.state.timer == 0
          ? <img className= {'updateImg'} src={this.state.pokeSprite} />
          : <img className= {'pokeImg'} src ={this.state.pokeSprite}/>
          }
          {this.state.timer == 0
          ? <h1 className= {'pokeName'}>{this.state.pokeName}</h1>
          : null
          }
          
        </div>
      </div>
    )
  }
}

export default PokeFetch;
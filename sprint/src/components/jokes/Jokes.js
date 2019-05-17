import React from 'react';
//create component that renders list of jokes
import requiresAuth from '../authenticate/requireAuth';
import axios from 'axios';


class Jokes extends React.Component {
    state = {
        jokes: []
    }



    componentDidMount() {
        axios.get('/jokes')
        .then(res => {
          this.setState({ jokes: res.data });
        })
      }

    
render() {
    return (
        <div>
            <h2>Dad Jokes</h2>
            <ul>
            {this.state.jokes.map(joke => {
                return (
                  <div className='joke-card' key={joke.id}>
                    <h3>{joke.id}</h3>
                    <h3>{joke.joke}</h3>
                  </div>
                )
            })}
            </ul>
        </div>
    )
}
}

export default requiresAuth(Jokes);
import React from 'react';
import axios from 'axios';
import './App.css';



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: '',
      users: []
    }
  }


  componentDidMount() {
    axios
      .get(`https://api.github.com/users/tejanogenard`)
      .then(res => {
        console.log(res)
        this.setState({
          profile: res.data,
        })
      })
      .catch(err => console.log(err.message))
  }

  fetchFriends = e => {
    e.preventDefault()
    axios
    .get(`https://api.github.com/users/tejanogenard/followers`)
    .then(res => {
      console.log(res.data.followers_url)
      this.setState({
        users: res.data
      })
    })
  }


  render() {
    console.log("Profile", this.state.profile) 
    console.log("Users", this.state.users)
    return ( 
      <div className = "App" >
      <h1> Github Friends! </h1>
      <div className = "github-profile-card">
            <img width="200" src={this.state.profile.avatar_url} key={this.state.profile.id} alt={this.state.users}/>
            <p>Username: {this.state.profile.login}</p>
            <p>User-id: {this.state.profile.id}</p>
            <p>followers: {this.state.profile.followers}</p>
            <p>Public Repos: {this.state.profile.public_repos}</p>
      </div>
      <button onClick={this.fetchFriends}>Git Friends!</button>
      <div className = "github-friends">
        {this.state.users.map(user =>{
          return(
            <>
            <img width="180" src={user.avatar_url}
            key={user} alt={user}/>
              <p>Username: {user.login}</p>
               <p>User-id: {user.id}</p>
            </>
          )
        })}
     
        
      </div>
    </div>
    )
  }
}
export default App
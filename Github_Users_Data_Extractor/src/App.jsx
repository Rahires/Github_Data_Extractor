import axios from 'axios'
import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [username, setUsername] = useState("")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function Loaduserdata(name) {
    if (!name) return alert("Username daal bhava!")
    setLoading(true)
    try {
      let res = await axios.get(`https://api.github.com/users/${name}`)
      setData(res.data)
    } catch (err) {
      alert("User Not Found !")
      setData(null)
    }
    setLoading(false)
  }

  function HandleSubmit(e) {
    e.preventDefault()
    Loaduserdata(username.trim())
    setUsername("")
  }

  return (
    <div className="container">
      <h1 className="title">Github Extractor</h1>
      <p className="subtitle">Search any Github user profile</p>

      <form className="search-box" onSubmit={HandleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Github Username which you want search !...'
        />
        <button type='submit'>{loading ? '...' : 'Search'}</button>
      </form>

      {data && (
        <div className="card">
          <div className="card-header">
            <img src={data.avatar_url} alt="avatar" />
            <div>
              <h2>{data.name || data.login}</h2>
              <span>@{data.login}</span>
              <br />
              <a href={data.html_url} target="_blank" rel="noreferrer">View on Github →</a>
            </div>
          </div>

          {data.bio && <p className="bio">{data.bio}</p>}

          <div className="stats">
            <div><b>{data.public_repos}</b><br /><span>Repos</span></div>
            <div><b>{data.followers}</b><br /><span>Followers</span></div>
            <div><b>{data.following}</b><br /><span>Following</span></div>
          </div>

          <div className="extra">
            {data.location && <p>📍 {data.location}</p>}
            {data.company && <p>🏢 {data.company}</p>}
            {data.created_at && <p>📅 Joined {new Date(data.created_at).toDateString()}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
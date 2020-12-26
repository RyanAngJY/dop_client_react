import './index.scss'
import React, { memo, useState, useEffect } from 'react'
import request from 'utils/request'
import ViraspaceLogo from 'images/viraspace_logo.png'


const Home = props => {
    const [data, setData] = useState("")

    useEffect(() => {
        async function fetchData() {
            request
                .get('/')
                .then(res => {
                    console.log(res)
                    setData(JSON.stringify(res.data))
                })
                .catch(err => {
                    console.log(err)
                });
        }
        fetchData()
      });

    return (
        <div className="home-page">
            <h1>{data}</h1>
            <img src={ViraspaceLogo} alt="logo"></img>
        </div>
    )
}

Home.propTypes = {}

export default memo(Home)

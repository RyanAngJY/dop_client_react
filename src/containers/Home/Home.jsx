import './index.scss'
import React, { memo, useState, useEffect } from 'react'
import request from 'utils/request'
import ViraspaceLogo from 'images/viraspace_logo.png'


const Home = props => {
    const [data, setData] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [images, setImages] = useState([])

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
    }, []);

    const onChange = e => {
        const files = Array.from(e.target.files)
        setIsUploading(true)
    
        const formData = new FormData()
    
        files.forEach((file, i) => {
            formData.append(i, file)
        })
    
        request
            .post('/upload_image/', {
                body: formData,
            })
            .then(res => {
                console.log(res.data.image_url)
                setIsUploading(false)
                setImages(images => [...images, res.data.image_url])
            })
    }

    return (
        <div className="home-page">
            <h2>Data</h2>
            <p>{data}</p>
            <input type='file' id='single' onChange={onChange} /> 
            {isUploading ? <p>Is Uploading</p> : <p>Is Uploaded</p> }
            <h2>Images</h2>
            <p>{images}</p>
            <img src={ViraspaceLogo} alt="logo"></img>
        </div>
    )
}

Home.propTypes = {}

export default memo(Home)

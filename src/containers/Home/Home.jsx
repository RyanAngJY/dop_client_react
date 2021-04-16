import './index.scss'
import React, { memo, useState, useEffect } from 'react'
import request from 'utils/request'
import REACT_APP_SOCKET_BASE_URL from 'settings/socketConfig'
import ViraspaceLogo from 'images/viraspace_logo.png'
import io from 'socket.io-client';

class Dashboard extends React.Component {
    state = {
        socketData: "",
        broadcastedSocketData: "",
    }

    componentWillUnmount() {
        this.defaultSocket.close()
        this.namespaceSocket.close()
    }

    componentWillMount() {
        this.defaultSocket = io.connect(REACT_APP_SOCKET_BASE_URL, {
            reconnection: true,
        });
        this.namespaceSocket = io.connect(REACT_APP_SOCKET_BASE_URL + "custom_namespace", {
            reconnection: true,
        });
        this.defaultSocket.on("myCustomResponseMessage", message => {
            this.setState({'socketData': message.data })
        })
        this.namespaceSocket.on("myCustomResponseMessage", message => {
            this.setState({'socketData': message.data })
        })
        this.namespaceSocket.on("broadcastedMessage", message => {
            this.setState({'broadcastedSocketData': message.data })
        })
    }

    emitMessage = () => {
        this.defaultSocket.emit("message", {'data': 'emitMessage'})
    }

    emitCustomMessage = () => {
        this.defaultSocket.emit("custom_message", {'data': 'emitCustomMessage'})
    }

    emitToNamespace = () => {
        this.namespaceSocket.emit("message", {'data': 'emitToNamespace'})
    }

    render() {
        return (
            <>
                <div>Data: {this.state.socketData}</div>
                <div>Broadcasted Data: {this.state.broadcastedSocketData}</div>
                <button onClick={this.emitMessage}> Emit Message </button>
                <button onClick={this.emitCustomMessage}> Emit Custom Message </button>
                <button onClick={this.emitToNamespace}> Emit To Namespace </button>
            </>
        )
    }
}

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
        <>
            <div className="home-page">
                <h2>Data</h2>
                <p>{data}</p>
                <input type='file' id='single' onChange={onChange} /> 
                {isUploading ? <p>Is Uploading</p> : <p>Is Uploaded</p> }
                <h2>Images</h2>
                <p>{images}</p>
            </div>
            <Dashboard></Dashboard>
        </>
    )
}

Home.propTypes = {}

export default memo(Home)

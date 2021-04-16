import './index.scss'
import React, { memo, useState, useEffect } from 'react'
import request from 'utils/request'
import REACT_APP_SOCKET_BASE_URL from 'settings/socketConfig'
import io from 'socket.io-client';

class SocketBoard extends React.Component {
    state = {
        socketData: "",
        namespaceSocketData: "",
        broadcastedSocketData: "",
        isConsumerWorking: "NO",
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
        this.defaultSocket.on("isConsumerWorking", message => {
            console.log("isConsumerWorking")
            this.setState({'isConsumerWorking': "YES" })
        })
        this.namespaceSocket.on("myCustomResponseMessage", message => {
            this.setState({'namespaceSocketData': message.data })
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
                <p><span className="field">Is Consumer Working: </span>{this.state.isConsumerWorking}</p>
                <p><span className="field">Data: </span>{this.state.socketData}</p>
                <p><span className="field">Namespace Data: </span>{this.state.namespaceSocketData}</p>
                <p><span className="field">Broadcasted Data: </span>{this.state.broadcastedSocketData}</p>
                <button onClick={this.emitMessage}> Emit Message </button>
                <button onClick={this.emitCustomMessage}> Emit Custom Message </button>
                <button  onClick={this.emitToNamespace}> Emit To Namespace </button>
            </>
        )
    }
}

const Home = props => {
    const [db, setDb] = useState("")
    const [lib, setLib] = useState("")
    const [microservice, setMicroservice] = useState("")
    const [kafkaTopic, setKafkaTopic] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [images, setImages] = useState([])

    async function fetchData() {
        request
            .get('/')
            .then(res => {
                console.log(res)
                setDb(JSON.stringify(res.data.db))
                setLib(JSON.stringify(res.data.lib))
                setMicroservice(JSON.stringify(res.data.microservice))
                setKafkaTopic(JSON.stringify(res.data.topic))
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        fetchData()
    }, []);

    const triggerAPI = () => {
        fetchData()
    }

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
                <h2>Server Test</h2>
                <p><span className="field">DB: </span>{db}</p>
                <p><span className="field">Python Lib: </span>{lib}</p>
                <p><span className="field">Microservice: </span>{microservice}</p>
                <p><span className="field">Kafka Topic: </span>{kafkaTopic}</p>
                <p><span className="field">Image Upload: </span>{images}</p>
                <input type='file' id='single' onChange={onChange} /> 
                {isUploading ? <p>Is Uploading</p> : <p>Is Uploaded</p> }
                <button onClick={triggerAPI}>Trigger API</button>

                <h2>Socket Test</h2>
                <SocketBoard></SocketBoard>
            </div>
        </>
    )
}

Home.propTypes = {}

export default memo(Home)

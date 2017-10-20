import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store/index'


const render = () => {
    ReactDOM.render(
        <App
            state={store.getState()}
        />,
        document.getElementById('root')
    )
}

store.subscribe(render)
render()

registerServiceWorker()
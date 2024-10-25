
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./main.css"
import { store } from './redux/app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider></BrowserRouter>
  ,
)

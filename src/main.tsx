import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './pages/root'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
)

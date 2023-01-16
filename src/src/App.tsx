import { Background } from './components/background/background'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import './style/global.scss'

export const App = () => {
  return <>
    <Header/>
      <Background/>
    <Footer/>
  </>
}
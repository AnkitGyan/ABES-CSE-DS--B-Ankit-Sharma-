import './App.css'
import Card from './component/Card'
import Navbar from './component/Navbar'

function App() {
  return (
    <>
    <Navbar></Navbar>
     <Card image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1AKF7LelsXtbK8YAYYdiPrDMZdFd74ZTgkQ&s'} name={'Hathi'} kaam={'sugarcane khana'} emoji={'🎋'}/>
     <Card image={'https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'} name={'Chimpanzee'} kaam={'kela khana'} emoji={'🍌'}/>
     <Card image={'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg'} name={'chameleon'} kaam={'color badlna'} emoji={'🌖'}></Card>
    </>
  )
}

export default App;

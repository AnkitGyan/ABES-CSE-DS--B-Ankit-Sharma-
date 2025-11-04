import './Card.css'

function Card({image, name, kaam, emoji}){
  return(
    <div id="card">
      <img src={image} alt="image.jpeg" height={150} width={150}/>
       <h3>Name : {name}</h3>
     <h3>Kaam : {kaam} {emoji}</h3>
    </div>
  )
}

export default Card;
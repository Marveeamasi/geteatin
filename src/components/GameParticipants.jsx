
import GamePrt from './GamePrt'


const GameParticipants = ({p}) => {


  return (
    <div>
       {p.map(p=>
        <GamePrt p={p} key={p._id}/>
        )}
    </div>
  )
}

export default GameParticipants

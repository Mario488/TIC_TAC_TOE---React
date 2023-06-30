import O from "./images/O.png"
import X from "./images/X.png"
import Empty from "./images/black_square.png"

function Cell({id, classUse, handleClick, img}){
    return (
        <div id={id} className={classUse}>
            {img == "O" && <img onClick={() => handleClick(id)} src={O}/>}
            {img == "X" && <img onClick={() => handleClick(id)} src={X}/>}
            {img == "" && <img onClick={() => handleClick(id)} src={Empty}/>}
        </div>
    )
}

export default Cell
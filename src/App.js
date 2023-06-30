import {useState, useEffect} from "react"
import O from "./images/O.png"
import X from "./images/X.png"
import Cell from "./Cell"

function App() {

  const [gameFinished, setGameFinished] = useState()
  const [results, SetResults] = useState(() =>{
    const resultData = localStorage.getItem('results')
    return resultData ? JSON.parse(resultData) : [0, 0, 0]
  })
  
  const [cells, setCells] = useState(()=>{
    let cells = []
        for(let i = 1; i <= 9; i++){
            cells.push(
            <Cell 
                id={i} 
                classUse="cell" 
                handleClick={handleClick} 
                img=""
                turn={0}
            />)
        }
        return cells
  })
    function DetermineWinner(res){
        let decision = 0 // 1 - Player win, 2 - Computer win,  3 - TIE
        // Horizontal
        for(let i = 2; i < res.length; i+=3){
            let first = res[i - 2].props.img
            let second = res[i - 1].props.img
            let third = res[i].props.img
            if(first == second && second == third){
                if(first != ""){
                    decision = first == "X" ? 1 : 2
                    return decision
                }
            }
        }
        // Vertical
        for(let i = 0; i < 3; i++){
            let first = res[i + 6].props.img
            let second = res[i + 3].props.img
            let third = res[i].props.img
            if(first == second && second == third){
                if(first != ""){
                    decision = first == "X" ? 1 : 2
                    return decision
                }
            }
        }
        // Diagonals
        if(res[0].props.img == res[4].props.img && 
            res[4].props.img == res[8].props.img){
                if(res[0].props.img != ""){
                    decision = res[0].props.img == "X" ? 1 : 2
                    return decision
                }
        }
        if(res[2].props.img == res[4].props.img && 
            res[4].props.img == res[6].props.img){
                if(res[2].props.img != ""){
                    decision = res[2].props.img == "X" ? 1 : 2
                    return decision
                }
        }
        return decision
    }
    function handleClick(id){
        setCells(prev => {
            let prevTurn = -1; 
            let prevousSign = "" // This will be storing a string value either X or O
            for(let i = 0; i < prev.length; i++){
                prevTurn = Math.max(prevTurn, prev[i].props.turn) // find the last made move
            }
            if(prevTurn == 0){ // This means that there are no moves made yet
                let res = prev.map(item => { 
                    if(item.props.id == id)
                    {
                        return <Cell 
                            id={id} 
                            classUse="cell" 
                            handleClick={handleClick} 
                            img="X"
                            turn={prevTurn + 1}
                        />
                    }
                    return item
                })
                return res
            }   
            else{ // There are moves made already
                for(let i = 0; i < prev.length; i++){ // Searching for the previous move
                    if(prev[i].props.turn == prevTurn){
                        prevousSign = prev[i].props.img
                        break
                    }
                }
                let res = prev.map(item => { //Creating new array based on the previous move
                    if(item.props.id == id && item.props.turn == 0)
                    //Checks for the correct id of square and whether it is filled yet
                    {
                        return <Cell 
                            id={id} 
                            classUse="cell" 
                            handleClick={handleClick} 
                            img={prevousSign == "O" ? "X" : "O"}
                            turn={prevTurn + 1}
                        />
                    }
                    return item
                })
                let result = DetermineWinner(res)
                if(result == 0 && res.every(elem => elem.props.turn > 0)){
                    //checks whether it is a draw and every square is filled
                    SetResults(prev => {
                        prev[result] += 0.5
                        localStorage.setItem('results', JSON.stringify(prev));
                        return prev  
                    })
                    
                    setGameFinished(3) // This means it is a draw
                    
                    let cells = []
                        for(let i = 1; i <= 9; i++){
                            cells.push(
                            <Cell 
                                id={i} 
                                classUse="cell" 
                                handleClick={handleClick} 
                                img=""
                                turn={0}
                            />)
                        }
                    setTimeout(() => { // This is for visual purposes
                        setGameFinished(false)
                        return setCells(cells)
                    }, 2500);
                    
                }
                if(result != 0){
                    SetResults(prev => {
                        prev[result] += 0.5
                        localStorage.setItem('results', JSON.stringify(prev));
                        return prev
                    })
                    
                    setGameFinished(result) // either 0, 1, 2

                    let cells = []
                        for(let i = 1; i <= 9; i++){
                            cells.push(
                            <Cell 
                                id={i} 
                                classUse="cell" 
                                handleClick={handleClick} 
                                img=""
                                turn={0}
                            />)
                        }
                    setTimeout(() => {
                        setGameFinished(false)
                        return setCells(cells)
                    }, 2500);

                    
                }


                return res
            }
        })
    }

    
    
  return (
    <>
      <div className="container">
            {
                gameFinished  && 
                <>
                    <h1 className="result_message">
                        {gameFinished === 1 ? "Player 1 Won!" : gameFinished === 2 ? "Player 2 Won!" : "TIE"}

                    </h1>
                    <div className="grid blur disable-click">
                        {cells}
                    </div>
                </>
            }
            {!gameFinished &&
                <div className="grid">
                    {cells}
                </div>
            }
        </div>
        <div className="stats">
            <div>P-1</div>
            <div>TIE</div>
            <div>P-2</div>
        </div>
        <div className="results">
            <div>{JSON.parse(localStorage.getItem("results")) && JSON.parse(localStorage.getItem("results"))[1]}</div>
            <div>{JSON.parse(localStorage.getItem("results")) && JSON.parse(localStorage.getItem("results"))[0]}</div>
            <div>{JSON.parse(localStorage.getItem("results")) && JSON.parse(localStorage.getItem("results"))[2]}</div>
        </div>
    </>
  );
}

export default App;

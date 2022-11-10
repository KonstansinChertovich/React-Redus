import { useState, useCallback } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Preventer from "../preventer/Preventer";
import decoration from '../../resources/img/vision.png';

import WithFormingList from "../WithFormingList/WithFormingList";

const MainChar = () => {
    const [charId, setCharId] = useState(null)
    const onCharId = useCallback((id) => {
       setCharId(() => (id))
    },[])

    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <Preventer>
                    <WithFormingList Component={CharList} onCharId={onCharId} typeList={'char'}/>
                </Preventer>
                <Preventer>
                    <CharInfo charId={charId}/>
                </Preventer>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
        
    )
}

export default MainChar
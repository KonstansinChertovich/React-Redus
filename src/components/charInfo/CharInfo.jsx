import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchChar from '../../searchChar/SearchChar';

import { useLazyGetCharacterIdQuery } from '../../api/serviceApiMarvel';
import selectionState from '../util/selectionState';

import './charInfo.scss';


const CharInfo = ({charId}) => {
    const [togleCharInfo] = useLazyGetCharacterIdQuery()
    const [dataChar, setdataChar] = useState(null)
    const [status, setStatus] = useState('waiting')

    useEffect(() => {
        onLoadedCharId()
        // eslint-disable-next-line
    }, [charId])


    const onLoadedCharId = () => {
        if(!charId) {
            return
        }
        setStatus('loaded')
        togleCharInfo(charId)
            .then(({data}) => setdataChar(data))
            .then(() => setStatus('success'))
            .catch(() => setStatus('error'))
    }

    return (
        <div>
            <div className="char__info">
                {selectionState(status, () => charRender(dataChar))}
            </div>
            <SearchChar/>
        </div>
        
    )
}




function charRender(data) {
    const {name, description, thumbnail, wikiUrl, homeUrl, comics} = data
    let iconStyle = {'objectFit': 'cover'}
    
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        iconStyle = {'objectFit': 'contain'}
    }

    return(
        <>
            <div className='char__basics'>
                <img src={thumbnail} style={iconStyle} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homeUrl} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikiUrl} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics: {comics.length === 0 ? 'this character has no comics' : null}</div>
            <ul className="char__comics-list">
                {
                    comics.slice(0, 10).map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${comics[0].resourceURI.slice(-5)}`}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;
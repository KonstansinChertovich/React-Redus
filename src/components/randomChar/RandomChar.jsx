import { useState, useEffect } from 'react';

import selectionState from '../util/selectionState';
import { useLazyGetCharacterIdQuery } from '../../api/serviceApiMarvel';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [togleCharId] = useLazyGetCharacterIdQuery()
    const [char, setCharacter] = useState([])
    const [status, setStatus] = useState('inaction')

    useEffect(() => {
        servicesMarvelCharId()
        // eslint-disable-next-line
    }, []) 


    function servicesMarvelCharId() {
        setStatus('loaded')
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        togleCharId(id)
            .then(({data}) => setCharacter(data))
            .then(() => setStatus('success'))
            .catch(() => setStatus('error'))
    }


    const renderChar = ({data}) => {
        if(data.length === 0) return 

        const {name, thumbnail, description, homeUrl, wikiUrl} =  data
        let style = {'objectFit': 'cover'}
        let descr = description.length > 150 ? description.slice(0, 150) + '...' : description

        if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            style = {
                'objectFit': 'unset'
            }
        }

        return(
            <div className="randomchar__block">
                <img src={thumbnail} style={style} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {descr}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homeUrl} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikiUrl} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="randomchar">
                {selectionState(status, renderChar, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={() => servicesMarvelCharId()}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;
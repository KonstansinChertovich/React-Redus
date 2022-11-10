import { useState, useEffect, memo } from 'react';
import { useLazyGetCharacterAllQuery, useLazyGetCharacterComicsAllQuery } from '../../api/serviceApiMarvel';

function areEqual(prevProps, nextProps) {
    return prevProps.onCharId === nextProps.onCharId
}

const WithFormingList = memo(({Component, onCharId, typeList}) => {
    const [charTogle] = useLazyGetCharacterAllQuery()
    const [comicsTogle] = useLazyGetCharacterComicsAllQuery()
    const [hero, setData] = useState([])
    const [offset, setOffset] = useState(20)
    const [firstLoaded, setFirstloaded] = useState(true)
    const [fetching, setFetching] = useState(true)
    const [controlFetching, setControlFetching] = useState(true)
    const [status, setStatus] = useState('inaction')
    const myRef = []
    
    useEffect(() => {
        if(fetching) {
            switch(typeList) {
                case 'comics':
                    setStatus('loaded')
                    comicsTogle(offset)
                        .then(({data}) => onSubCharListLoaded(data))
                        .catch(() => setStatus('error'))
                        .finally(() => setFetching(false))
                        break
                case 'char' : 
                    setStatus('loaded')
                    charTogle(offset)
                        .then(({data}) => onSubCharListLoaded(data))
                        .catch(() => setStatus('error'))
                        .finally(() => setFetching(false))
                        break
                default: return new Error()
            }
        }
        // eslint-disable-next-line
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', sclrollHendler)

        return () => {
            document.removeEventListener('scroll', sclrollHendler)
        }
        // eslint-disable-next-line
    }, [hero])
    
    const addElemMyRef = (elem) => {
        myRef.push(elem)
    }
    const onFocusCard = (i) => {
        myRef.forEach(item => item.classList.remove('char__item_selected'))
        myRef[i].classList.add('char__item_selected')
        myRef[i].focus()
    }

    const onSubCharListLoaded = (newData) => {
        setData(() => ([...hero, ...newData]))
        setOffset(offset + 9)
        setStatus('success')
        if(firstLoaded) {
            setFirstloaded(false)
        }
        if(newData.length < 8) {
            setControlFetching(false)
        }
    }
    const sclrollHendler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && controlFetching) {
            setFetching(true)
        }
    }

    
    return <Component 
                hero={hero}
                status={status}
                onCharId={onCharId}
                fetching={firstLoaded}
                addElemMyRef={addElemMyRef}
                onFocusCard={onFocusCard}
            />
}, areEqual)

export default WithFormingList
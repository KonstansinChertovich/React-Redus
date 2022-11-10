import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import AppBanner from "../appBanner/AppBanner"
import { useLazyGetCharacterIdQuery, useLazyGetCharacterComicsIdQuery } from "../../api/serviceApiMarvel"

import selectionState from "../util/selectionState"


const CharacterDescriptions = ({Component, dataType}) => {
    const [togleChar] = useLazyGetCharacterIdQuery()
    const [togleComic] = useLazyGetCharacterComicsIdQuery()
    const {id} = useParams()
    const [data, setData] = useState(null)
    const [status, setStatus] = useState('inaction')
    
    useEffect(() => {
        switch(dataType) {
            case 'character': 
                setStatus('loaded')
                togleChar(id)
                    .then(({data}) => setData(data))
                    .then(() => setStatus('success'))
                    .catch(() => setStatus('error'))
                break
            case 'comics':
                setStatus('loaded')
                togleComic(id)
                    .then(({data}) => setData(data))
                    .then(() => setStatus('success'))
                    .catch(() => setStatus('error'))
                break
            default:
                return null
        }
        // eslint-disable-next-line
    }, [id])

    return(
        <>
            <AppBanner/>
            {selectionState(status, Component, data)}
        </>
    )
}

export default CharacterDescriptions
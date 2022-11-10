import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const transformCharacter = (obj) => {
    return {
        id: obj.id,
        name: obj.name,
        description: obj.description,
        thumbnail: obj.thumbnail.path + '.' + obj.thumbnail.extension,
        homeUrl: obj.urls[0].url,
        wikiUrl: obj.urls[1].url,
        comics: obj.comics.items
    }
} 
const transformComics = (obj) => {
    return {
        id: obj.id,
        title: obj.title,
        description: obj.description,
        language: obj.textObjects.length > 0 ? obj.textObjects[0].language : undefined,
        thumbnail: obj.thumbnail.path + '.' + obj.thumbnail.extension,
        pageCount: obj.pageCount,
        price: obj.prices[0].price
    }
}

export const serviceApiMarvel = createApi({
    reducerPath: 'apiMarvel',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gateway.marvel.com:443/v1/public/'
    }),
    endpoints: build => ({
        getCharacterAll: build.query({
            query: (offset) => ({
                url: `characters?limit=9&offset=${offset}&apikey=771029667325fc0068ee7c64c488ff68`
            }),
            transformResponse: response => {
                return response.data.results.map(transformCharacter)
            }
        }),
        getCharacterId: build.query({
            query: id => ({
                url: `characters/${id}?apikey=771029667325fc0068ee7c64c488ff68`
            }),
            transformResponse: response => {
                return transformCharacter(response.data.results[0])
            }
        }),
        getCharacterComicsAll: build.query({
            query: offset => ({
                url: `comics?limit=8&offset=${offset}&apikey=771029667325fc0068ee7c64c488ff68`
            }),
            transformResponse: response => {
                return response.data.results.map(transformComics)
            }
        }),
        getCharacterComicsId: build.query({
            query: id => ({
                url: `comics/${id}?apikey=771029667325fc0068ee7c64c488ff68`
            }),
            transformResponse: response => {
                return transformComics(response.data.results[0])
            }
        }),
        getCharacterName: build.query({
            query: name => ({
                url: `characters?name=${name}&orderBy=name&apikey=771029667325fc0068ee7c64c488ff68`
            }),
            transformResponse: response => {
                if(response.data.results.length === 0) {
                    return undefined
                }
                return response.data.results.map(obj => ({
                    id: obj.id,
                    name: obj.name,
                    description: obj.description,
                    thumbnail: obj.thumbnail.path + '.' + obj.thumbnail.extension,
                    homeUrl: obj.urls[0].url,
                    wikiUrl: obj.urls[1].url,
                    comics: obj.comics.items
                }))
            }
        })
    })
})

export const {
    useLazyGetCharacterAllQuery,
    useLazyGetCharacterComicsAllQuery,
    useLazyGetCharacterComicsIdQuery,
    useLazyGetCharacterIdQuery,
    useLazyGetCharacterNameQuery
} = serviceApiMarvel
import selectionState from '../util/selectionState';

import './charList.scss';

const CharList = ({status, hero, fetching, addElemMyRef, onFocusCard, onCharId}) => {
    const renderItems = ({data}) => {
        let item = null

        if(data) {
            item = data.map(({id, name, thumbnail}, i) => {
                let style = {
                    'objectFit':'cover'
                }
                if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    style = {'objectFit':'unset'}
                }
                return (
                    <li 
                        ref={addElemMyRef} 
                        tabIndex={0} 
                        className="char__item" 
                        key={id}
                        onClick={() => {
                            onCharId(id)
                            onFocusCard(i)
                        }}
                        onKeyDown={e => {
                            if(e.key === 'Enter' || e.key === ' ') {
                                onCharId(id)
                                onFocusCard(i)
                            }
                        }}>
                        <img src={thumbnail} style={style} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>
                )
            })
        }
            
        return (
            <ul className="char__grid">
                    {item}
            </ul>
        )
    }
    return (
        <div className="char__list">
            {selectionState(status, renderItems, hero, fetching)}
        </div>
    )
}

export default CharList;
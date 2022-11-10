import { Link } from 'react-router-dom'
import selectionState from '../util/selectionState'

import './charComics.scss'


const CharComics = ({status, hero, fetching}) => {
    const cardGenerator = ({data}) => {
        let item = null
        if(data) {
            item = data.map(({title, price, thumbnail, id}, i) => {
                return(
                    <li key={i} className='comics__item'>
                        <Link to={`/comics/${id}`}>
                            <img className='comics__item-img' src={thumbnail} alt={title} />
                            <div className='comics__item-name'>{title}</div>
                            <div className='comics__item-coins'>{price}</div>
                        </Link>
                    </li>
                )
            })
        }

        return (
            <ul className='comics__grid'>
                {item}
            </ul>
        )
    }

    return(
        <div className='comics__list'>
            {selectionState(status, cardGenerator, hero, fetching)}
        </div>
    )
}




// const CharComics = () => {
//     const [data, setComics] = useState(null)
//     const [offset, setOffset] = useState(30)
//     const [onSubloadItem, setOnSubloadItem] = useState(false)
//     const [activeBtn, setActiveBtn] = useState(false)
//     const {status, setstatus, getAllComics, clearError} = DataRequest()

//     useEffect(() => {
//         setActiveBtn(true)
//         requestComics(offset, updateComics)
//         // eslint-disable-next-line
//     },[])

//     const toglSubLoadItem = () => {
//         setOnSubloadItem(true)
//     }
//     const requestComics = (offset, request) => {
//         getAllComics(offset)
//             .then(request)
//     }
//     const loadMore = () => {
//         setActiveBtn(true)
//         toglSubLoadItem()
//         clearError()
//         requestComics(offset + 8,clickUpdateComics)
//         setOffset(offset + 8)
//     }
//     const updateComics = (comics) => {
//         setComics(comics)
//         setActiveBtn(false)
//         setstatus('success')
//     }
//     const clickUpdateComics = (newComics) => {
//         setComics((comics) => ([...comics, ...newComics]))
//         setActiveBtn(false)
//         setstatus('success')
//     }
//     const cardGenerator = ({data}) => {
//         let item = null
//         if(data) {
//             item = data.map(({title, price, thumbnail, id}, i) => {
//                 return(
//                     <li key={i} className='comics__item'>
//                         <Link to={`/comics/${id}`}>
//                             <img className='comics__item-img' src={thumbnail} alt={title} />
//                             <div className='comics__item-name'>{title}</div>
//                             <div className='comics__item-coins'>{price}</div>
//                         </Link>
//                     </li>
//                 )
//             })
//         }

//         return (
//             <ul className='comics__grid'>
//                 {item}
//             </ul>
//         )
//     }

//     return(
//         <div className='comics__list'>
//             {selectionState(status, cardGenerator, data, onSubloadItem)}
//             <button 
//                 className="button button__main button__long"
//                 onClick={loadMore}
//                 disabled={activeBtn}>
//                     <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

export default CharComics
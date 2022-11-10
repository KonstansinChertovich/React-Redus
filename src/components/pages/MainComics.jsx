import AppBanner from "../appBanner/AppBanner"
import CharComics from "../charComics/CharComics";

import WithFormingList from "../WithFormingList/WithFormingList";

const MainComics = () => {
    return(
        <>
            <AppBanner/>
            <WithFormingList Component={CharComics} typeList={'comics'}/>
        </>
        
    )
}

export default MainComics
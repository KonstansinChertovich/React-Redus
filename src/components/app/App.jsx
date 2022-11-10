import { lazy, Suspense } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Provider } from "react-redux";
import store from "../../store";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../Spinner/Spinner";

const MainChar = lazy(() => import('../pages/MainChar'))
const MainComics = lazy(() => import('../pages/MainComics'))
const MainSingleComic = lazy(() => import('../pages/MainSingleComic'))
const Http404 = lazy(() => import('../pages/Http404'))
const MainSingleCharName = lazy(() => import('../pages/MainSingleCharName'))
const SinglePage = lazy(() => import('../pages/SinglePage'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <Provider store={store}>
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path='/' element={<MainChar/>}/>
                                <Route path='/comics' element={<MainComics/>}/>
                                <Route path="/comics/:id" element={<SinglePage Component={MainSingleComic} dataType={'comics'}/>}/>
                                <Route path="/character/:id" element={<SinglePage Component={MainSingleCharName} dataType={'character'}/>}/>
                                <Route path="*" element={<Http404/>}/>
                            </Routes>
                        </Suspense>
                    </main>
                </Provider>
            </div>
        </Router>
    )
}

export default App;
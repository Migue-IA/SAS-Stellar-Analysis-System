import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './layouts/Dashboard'
import HomePage from './views/HomePage'
import About from './views/About'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Dashboard />}>
                    <Route path='/' element={<About/>} index />
                    <Route path='/simulacion' element={<HomePage/>}/>
                </Route>                
            </Routes>
        </BrowserRouter>
    )
}
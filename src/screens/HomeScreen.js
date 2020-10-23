import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import ToggleSwitch from '../components/ToggleSwitch'
import Searchbar from '../components/Searchbar'
import DateTimeField from '../components/DateTimeField'
const HomeScreen = props => {
    const productList = useSelector(state => state.productList)
    const { products, workers, loading, error } = productList
    const dispatch = useDispatch()
    let workerImg = []
    let searchedProds = []
    let searchedWorkers = []
    let searchedWorkedIds = []
    const [searchStr, setSearchStr] = useState('')
    const [sortLate, setSortLate] = useState(false)

    if (searchStr.length > 0) {
        searchedWorkers = workers.filter(w => (w.name.toLowerCase()).match(searchStr.trim().toLowerCase()))
        if (searchedWorkers && searchedWorkers.length > 0) {
            searchedWorkers.map(s => searchedWorkedIds.push(s.id))
            searchedWorkedIds.map(id => {
                let prods = products.filter(p => p.workerId === id)
                searchedProds = [...searchedProds, ...prods]
            }
            )
        }
    }
    let updatedProd = searchStr.length === 0 ? products : searchedProds
    const onToggleSwitchChange = () => {
        setSortLate(prev => !prev)
    }
    useEffect(() => {
        dispatch(listProducts())
        return () => {

        }
    }, [searchStr, sortLate])

    if (workers) {
        workers.map(w => {
            workerImg.push(w.image)
        })
        if (sortLate) {
            updatedProd.sort((a, b) => b.deadline - a.deadline)
        } else {
            updatedProd.sort((a, b) => a.deadline - b.deadline)
        }
    }

    return loading ? <div>loading...</div> : error ? { error } :
        (<div>
            <div className="search">
                <Searchbar
                    id="name-input"
                    searchVal={searchStr}
                    handleChange={(e) => setSearchStr(e.target.value)} />
            </div>
            <div className="ToggleContainer">
                <span>Earlist First</span>
                <ToggleSwitch
                    id="deadline-input"
                    checked={sortLate}
                    toggleSwitchChange={() => onToggleSwitchChange()} />
                <span>Latest First</span>
            </div>
            <ul className="products">
                {updatedProd && updatedProd.length > 0 ? updatedProd.map(product =>
                    <li key={product.id}>
                        <div className="product">
                            <div className="order">{product.name}</div>
                            <div className="orderInfo">
                                <div className="id"><b>id</b>: {product.id}</div>
                                <div className="deadline"><b>deadline</b>: {product.deadline}</div>
                                <div className="workerId"><b>workerId</b>: {product.workerId}</div>
                                <div className="decription"><b>description</b>: {product.description}</div>
                            </div>
                            <div className="worker">
                                <img className="workerImage" src={workerImg[product.workerId]} alt="workerImg" />
                                <div className="workerContent">
                                    <div className="workerInfo">
                                        <div className="workerName">{workers[product.workerId].name}</div>
                                        <div className="companyName">{workers[product.workerId].companyName}</div>
                                        <div className="email">{workers[product.workerId].email}</div>
                                    </div>
                                    <DateTimeField dt={new Date(product.deadline * 1000)} />
                                </div>
                            </div>
                        </div>
                    </li>
                ) : <div>No worker orders associated with typed worker name was found!</div>
                }
            </ul>
        </div>)
}
export default HomeScreen
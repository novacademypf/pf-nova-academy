import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveDataFilter, setMenuOptions } from "../redux/actions/filterActions"
import { filters } from "../helpers/filters"


export const useSearchbar = () => {
    const options = useSelector((state) => state.setMenuOptionsReducer)
    const { courseAll } = useSelector((state) => state.coursesReducer.courses)
    const {dataFilter} = useSelector((state) => state.saveDataFilterReducer)

    const dispatch = useDispatch()
    const [valueInput, setValueInput] = useState('')
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setValueInput(value)
        dispatch(setMenuOptions(name, value))

    }
    useEffect(() => {
        dispatch(saveDataFilter(filters(options, courseAll)))
    }, [options])
    return {
        valueInput, handleOnChange,dataFilter,options
    }
}
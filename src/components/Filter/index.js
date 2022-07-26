import React,{useState} from 'react'

function Filter({getValueFilter}) {
  const [filter,setFilter] = useState("")
  
  const handleFilter = (e)=>{
    const name = e.target.value
    setFilter(name)
    getValueFilter(name)

  }
  return (
    <div className='col-md-6'>
        <div className="form-group">
            <input
            className="form-control"
            type="text"
            placeholder="Add Something..."
            name="filter"
            value={filter}
            onChange={handleFilter}
            />
        </div>
    </div>
  )
}

export default Filter
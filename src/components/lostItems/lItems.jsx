import React,{ useState, useEffect } from 'react'
import './style.css'
import { supabase } from '../createClient'

function LostItems() {
        
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
  }, []);

  async function fetchUsers() {
    const {data} = await supabase
    .from('lost_items')
    .select('*')   
    setUsers(data)
    console.log(data)
  }

  return (
    <>
      <div className="LI-Title">
        LOST ITEMS
      </div>
      <div className="LI-List">{
        users.map((item,index) => (
          <div className="LI" key={index}>
              <div className="info">
                <p className="Item-Name">{item.item_name}</p>
                <p className="Location">Last Seen at:{item.location}</p>
              </div>
              <div className="BDesign"></div>
              <div className="LII"></div>
          </div>
        ))}
      </div>
    </>
  )
}

export default LostItems

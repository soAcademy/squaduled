import React from 'react'
import axios from 'axios'
import * as appConfig from '../AppConfig'


const BuildingDetail = (props) => {
  const [buildingName, setBuildingName] = React.useState('')

  React.useEffect(() => {
    const data = JSON.stringify({
      "id": +props.buildingId
    });
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/getBuildingById`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data)
      setBuildingName(response.data?.name)
    })
    .catch((error) => {
      console.log(error);
    });
  }, [props.buildingId])

  return (
    <div>Manage rooms for {buildingName}</div>
  )
}

export default BuildingDetail
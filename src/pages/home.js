
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BUILDING_DATA } from '../graphql/Queries';
import List from '../component/list';
import getCurrentDate from '../helpers/utils';
import { Link } from 'react-router-dom';


function Home() {

    // const [selectedBuilding, SetSelectedBuilding]= useState('');
    const [listData , setListData] = useState([]);
    const { data, loading, error } = useQuery(GET_BUILDING_DATA);
  
    useEffect(() => {
        setListData(transformDataForList(data))
    }, [data]);

    function transformDataForList(data) {
        if (!data) return
        let noOfBuilding = data.Buildings.length;
        let getCurrentDateTime = getCurrentDate();
        let noOfMeetingRoom = 0;
        let noOfOngoingMeeting = 0;
        let totalMeeting = 0;
        let noOfFreeMeetingRoom = 0;
        data.Buildings.forEach(element => {
            if (element.meetingRooms) {
                noOfMeetingRoom += element.meetingRooms.length;
                if (element.meetingRooms.meetings) {
                    totalMeeting += element.meetingRooms.meetings.length;
                    element.meetingRooms.meetings.forEach((el) => {
                        if (el.date === getCurrentDateTime.date) {
                            if (getCurrentDateTime.time > el.startTime && getCurrentDateTime.time < el.endTime) {
                                noOfOngoingMeeting += noOfOngoingMeeting;
                            }
                        }
                    })
                 
                }
            }
        });
        return [{
            title: 'Building',
            data: [`Total ${noOfBuilding}`]
        },
        {
            title: 'Rooms',
            data: [`Total ${noOfMeetingRoom}`,`Free Now ${noOfMeetingRoom - noOfOngoingMeeting}`]
        },
        {
            title: 'Meetings',
            data: [`Total ${totalMeeting} Today`,`Total ${noOfOngoingMeeting} Going on now`]
    }]
  }
  
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    function handleSelectChange(event) {
        // SetSelectedBuilding(event.target.value)
    }

    function selectedItem(event, item) {
        console.log(event,item, arguments,"on Card Seelction")
    }

  return (
      <>
        {/* <select  value={selectedBuilding} onChange={handleSelectChange}>
            {(data && data.Buildings) ? data.Buildings.map((e, index) => {
                return <option key={index} value={e.name}>{e.name}</option>;
            }) : <option>Select</option>}
        </select> */}
        <div>
           {(!data) ? <div>Loading Meeting Room Details</div> : <List data={listData} handleOnClick={selectedItem}/>}   
        </div>
        <Link to="/add-meeting" className="btn btn-primary">Add Meeting</Link>
       
      </>
  );
}

export default Home;
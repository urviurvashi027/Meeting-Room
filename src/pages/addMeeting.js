import { useEffect, useState } from 'react';
import { useQuery,useMutation } from '@apollo/client';
import getCurrentDate from '../helpers/utils';
import List from '../component/list';
import { GET_BUILDING_DATA, ADD_MEETING_INFO } from '../graphql/Queries';

function AddMeeting (props) {

    const [selectedDate, onDateChange] = useState(new Date());
    const [meetingTitle, onTitleChange] = useState('');
    const [selectedBuilding, SetSelectedBuilding]= useState('');
    const [startTime, onStartTimeChange] = useState('');
    const [endTime, onEndTimeChange] = useState('');
    const [freeRoomList, setfreeRoomList] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [showSaveBtn, setShowSaveBtn] = useState(true);

    const [addMeetingInfo, { data: meetingDetails }] = useMutation(ADD_MEETING_INFO);
    const { data, loading, error } = useQuery(GET_BUILDING_DATA);


    // useEffect(() => {
    //     console.log(data, "----------Use Effect -------------");
    // }, [data]);

    useEffect(() => {
    }, [meetingDetails]);


    function handleFormSubmit(event) {
        event.preventDefault();
        let result = availableRoom();
        if (result.length) {
            setfreeRoomList(result);
        } else {
            let arr = [{title: "No Room available"}];
            setShowSaveBtn(false)
            setfreeRoomList(arr);
        }   
     }

     function isValidMeetindTime() {
        let currentDateNTime = getCurrentDate();
        let currentTime =  currentDateNTime.time;
        let currentDate = currentDateNTime.date;
        if (selectedDate >= currentDate.split("/").reverse().join("-")) {
            if (selectedDate === currentDate.split("/").reverse().join("-")) {
                if (startTime >= currentTime && endTime >= startTime) {
                    return true
                } else {
                    return false
                } 
            } else if (endTime >= startTime) {
                return true
            }
        }
     }

     function availableRoom() {
         let result = [];
         let isValid = isValidMeetindTime();
         console.log(isValid,"isValid")
         if(isValid) {
             console.log(selectedBuilding, data, "selectedBuilding")
            data.Buildings.forEach((element, i) => {
                console.log(typeof selectedBuilding,typeof element.id, element)
                if (Number(selectedBuilding) === element.id) {
                    if (element.meetingRooms && element.meetingRooms.length) {
                        let meetRoom = element.meetingRooms; 
                        let found = false;
                        meetRoom.forEach((meet, index) => {
                            if (meet.meetings && meet.meetings.length) {
                                meet.meetings.forEach((item, k) => {
                                    if (item.date ===  selectedDate) {
                                        if (startTime >= item.startTime && startTime <= item.endTime || 
                                            endTime >= item.startTime && endTime <= item.endTime) {
                                        } else {
                                            if (!found) {
                                                found = true;
                                                result.push(
                                                    {
                                                        title: `${meet.name}`,
                                                        id: k,
                                                        meetingRoomId: meet.id,
                                                        data: [`Name of Building: ${element.name}`, `Floor: ${meet.floor}`]
                                                    });
                                            }
                                        }
                                    } else {
                                        if (!found) {
                                            found = true;
                                            result.push({
                                                title: `${meet.name}`,
                                                id: k,
                                                meetingRoomId: meet.id,
                                                data: [`Name of Building: ${element.name}`, `Floor: ${meet.floor}`]                            
                                        });
                                        }
                                    }
                                })       
                         } else {
                            result.push({
                                title: `${element.meetingRooms.name}`,
                                id: 10,
                                meetingRoomId: 10,
                                data: [`Name of Building: ${element.name}`, `Floor: ${element.meetingRooms.floor}`]                 
                            });
                         }
                        })
                    }
                }
               
            });
         }       
         return result;
     }

     function handleSelectChange(event) {
         console.log(event.target.value, 'On Build selection');
         if (event.target.value > 0) {
            SetSelectedBuilding(event.target.value)
         }
        
    }

    function selectedItem(item) {
        setSelectedRoom(item)  
    }

    function saveMeetingDetails() {
    
       addMeetingInfo({
           variables: {
            id: selectedRoom.id, 
            title: meetingTitle, 
            date: selectedDate, 
            startTime: startTime, 
            endTime: endTime, 
            meetingRoomId: selectedRoom.meetingRoomId
           }
       });
       props.history.push("/");
    }

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <div>
            {(!freeRoomList.length) ? (
             <div>
                  <h4>Add Meeting</h4>   
                 <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="formField">
                        <label>Title: </label>    
                        <input
                            id="title"
                            type="text"
                            name="meet-title"
                            required
                            value={meetingTitle}
                            onChange={(e) => onTitleChange(e.target.value)}
                        />
                    </div>  

                    <div className="formField">
                        <label>Choose Date:</label>    
                        <input
                            id="date-input"
                            type="date"
                            name="dateRequired"
                            required
                            value={selectedDate}
                            onChange={(e) => onDateChange(e.target.value)}
                        />
                    </div>  

                    <div className="formField">
                    <label>Start Time: </label>
                    <input type="time" id="startTime"
                        name="start-time"
                        required
                        value={startTime}
                        onChange={(e) => onStartTimeChange(e.target.value)}
                    ></input>
                    </div>

                    <div className="formField">
                    <label>End Time: </label>
                    <input type="time" id="endTime"
                        name="end-time"
                        required
                        value={endTime}
                        onChange={(e) => onEndTimeChange(e.target.value)}
                    ></input>
                    </div>  

                    <div className="formField">
                    <label>Select Building: </label>    
                    <select  value={selectedBuilding} onChange={handleSelectChange}>
                        <option value="-1" >Select</option>
                        {(data && data.Buildings) ? data.Buildings.map((e, index) => {
                            return <option key={index} value={e.id}>{e.name}</option>;
                        }) : <option>Select</option>}
                    </select>
                    </div>
        
                    <input type="submit" value="Submit" />
                </form>
             </div>       
             
            ) : <div>
                    <List data={freeRoomList} handleOnClick={selectedItem}/>
                    {(showSaveBtn) ? <button onClick={saveMeetingDetails}>Save</button> : null}
                </div>}
           
            
        </div>
    )
}


export default AddMeeting
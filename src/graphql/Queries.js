import { gql } from '@apollo/client';

export const GET_BUILDING_DATA = gql `
{
    Buildings {
        id
        name
        meetingRooms{
            id
            name
            floor  
            meetings{
                title
                date
                startTime
                endTime
            }
        }
    }
}
`;

export const GET_MEETING_ROOM = gql `
{
    MeetingRooms{
        name
        floor
        building{
            name
        }
        meetings{
            title
        }
    }
}
`;

export const ADD_MEETING_INFO = gql`
mutation Meeting($id: Int!, $title: String!, $date: String!, $startTime: String!, $endTime: String!, $meetingRoomId: Int!) {
Meeting(id: $id, title: $title, date: $date, startTime: $startTime, endTime: $endTime, meetingRoomId: $meetingRoomId) {
    id
    title
}
}
`;


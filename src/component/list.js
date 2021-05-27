 function List (props) {
    return (
        <ul className="list-group">
        {(props.data) ? props.data.map((el,index) => {
                return (
                    <li key={index} onClick={() => props.handleOnClick(el)}>
                      <h5 className="meetingTitle">{el.title}</h5>
                      {
                          el.data ? el.data.map((subitem, index) => {
                            return (
                              <div className="meetingData" key={index}>{subitem}</div>
                            )
                          }) : null
                        }
                      </li>
                )
            }) : <span>Loading</span>}
      </ul>
    )
}


export default List;

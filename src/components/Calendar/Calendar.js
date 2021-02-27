import styled from "styled-components"

const StyledDate = styled.div`
    font-family: 'Open Sans' ;
    background-color: #f4f5f6;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    border-radius: 7px;
    color: #1e232a;
    cursor: pointer;

`

function Calendar() {
    
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let currentDate = `${day}/${month}/${year}`



    return (
        <StyledDate>
            {currentDate}
        </StyledDate>
    )

}

export default Calendar;
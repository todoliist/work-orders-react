import React from 'react'
const DateTimeField = props => {

    let m = (props.dt.getMonth() + 1) + ""
    let d = (props.dt.getDate()) + ""
    let y = (props.dt.getFullYear()) + ""
    let h = (props.dt.getHours())

    let AMPM = h >= 12 ? 'PM' : 'AM'
    h = h > 12 ? h - 12 : h
    if (h === 0) {
        h = 12
    }
    h = h + ""
    let mm = props.dt.getMinutes()
    let s = props.dt.getSeconds()


    h = h < 10 ? ("0" + h) : h + ""
    mm = mm < 10 ? ("0" + mm) : mm + ""
    s = s < 10 ? ("0" + s) : s + ""
    return (
        <div className="time">{
            m + "/" +
            d + "/" +
            y + ", " +
            h + ":" +
            mm + ":" +
            s + ' ' + AMPM
        }</div>
    )
}

export default DateTimeField
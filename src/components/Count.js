import React from "react";
let HH = 0;

class Count extends React.Component {



    render() {
        const { data } = this.props;
        const MMH = this.props.MMH;
        const HHMM = this.props.HHMM;
        return (

            <div>
                {HHMM}:{MMH}:{data}
            </div>


        )}



}


export default Count;
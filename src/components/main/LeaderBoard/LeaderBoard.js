import React from "react";
import './LeaderBoard.scss'
import {database} from "./../../../firebase";
import Loader from "../../../UI/loader/loader";

class LeaderBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    database.ref().on('value', (snapshot) => {
      this.setState({
        data: snapshot.val()
      })
    })
  };

  render() {
    return (
       <div className='leader-board'>
         <table className='leader-board-table'>
           <caption><h1 className='leader-board-table-headline'>List of the leaders</h1></caption>
           {this.state.data === null
              ? <thead>
              <tr>
                <td><Loader/></td>
              </tr>
              </thead>
              : <>
                <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Difficulty</th>
                </tr>
                </thead>
                <tbody>{
                  this.state.data.BestResults.map(function (item, index) {
                    return (
                       <tr key={index}>
                         <td>{index + 1}</td>
                         <td>{item.name}</td>
                         <td>{item.time}</td>
                         <td>{item.difficulty}</td>
                       </tr>
                    )
                  })}
                </tbody>
              </>
           }
         </table>
       </div>
    )
  }
}

export default LeaderBoard
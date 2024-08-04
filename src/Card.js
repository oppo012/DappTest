import './Card.css';
import { useState, useEffect} from 'react';
import { ethers } from 'ethers';
import ABI from './contractABI.json';

const moment = require('moment');

function Card(props) {
    const [checked, setChecked] = useState(props.done);
    const [time, setTime] = useState();
    const [loading, setLoading] = useState(false);

    const toggle = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x9066bD03740cC6Cf2bF46B894cA9e97c90e32e1f", ABI, signer);

        const toggleTask = await contract.toggleTask(props.id);
        const receipt = await toggleTask.wait();
        if (receipt.confirmations > 0){
            setChecked(!checked);
        }
    }


    useEffect(() => {
        if (checked) {
          setTime(moment.unix(props.time).fromNow());
        }else{
            setTime("Not Finished")
        }
      }, [checked]);

    

    return(
        <div class = "toDoItem">
            <p>Task Name:</p>
            <p>{props.Name}</p>
            <input onClick = {toggle} type = "checkbox" checked = {checked}/>
            <p>Finished Time: {time}</p>
        </div>
    )
}

export default Card;
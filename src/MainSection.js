import './MainSection.css';
import Cat from './Cat.js';
import { useState , useEffect} from 'react';
import { ethers } from 'ethers';
import ABI from './contractABI.json';
import Card from './Card.js';


function MainSection() {
   //const [count, setCount] = useState(0);
   //function increase() {
    //setCount(preCount => preCount +1)
   //}
   //function decrease() {
    //setCount(preCount => preCount -1)
   //}
    const [currentAccount, setCurrentAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [chainName, setChainName] = useState(null);
    const [balance, setBalance] = useState(null);
    const [blockNumber, setBlockNumber] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [input, setInput] = useState(null);

    const change = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x9066bD03740cC6Cf2bF46B894cA9e97c90e32e1f", ABI, signer);

        const creatTask = await contract.creatTask(input);

    }

    const getData = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x9066bD03740cC6Cf2bF46B894cA9e97c90e32e1f", ABI, signer);

        const total = await contract.totalTasks();
        
        setTasks([]);

        for(var i = 0; i < total; i++){
            const currentTask = await contract.taskList(i);
            setTasks(preTask => [...preTask, currentTask]);
        }

    }

    const getwalletInfo = async () => {
        if(window.ethereum && window.ethereum.isMetaMask){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts");
            const currentAddress = await provider.getSigner().getAddress();
            setCurrentAccount(currentAddress)

            const chain = await provider.getNetwork();
            setChainId(chain.chainId);
            setChainName(chain.name);

            const amount = await provider.getBalance(currentAddress);
            const amountInEth = ethers.utils.formatEther(amount);
            setBalance(amountInEth);

            const blockNumber = await provider.getBlockNumber();
            setBlockNumber(blockNumber);

        }
    }
// When change wallet chain and account, load automaticlly 
    function chainChanged(){
        window.location.reload();
    }
    window.ethereum.on('chainChanged', chainChanged);
    window.ethereum.on('accountsChanged', getwalletInfo);

    useEffect(() => {
        getwalletInfo();
        getData();
    }, [])


    return (
        <div class = "MainSection"> 
            <div class = "Content">
                <button onClick = {getwalletInfo}>Connect</button>
                <p>{currentAccount}</p>
                <p>Chain ID: {chainId}</p>
                <p>Chain Name: {chainName}</p>
                <p>Balance: {balance}</p>
                <p>block#: {blockNumber}</p>

                <input value = {input} onInput = {x => setInput(x.target.value)}/>
                <button onClick = {change}>Add Task</button>

                {tasks.map((item) => (
                    <Card Name = {item.taskName} id = {item.id} done = {item.completedYet} time = {item.completeTime}/>

                ))}
            </div>
            

            <div class = "Sidebar">
                <Cat id = "GRd9CRuaYAET7uo?" name = "Karina"/>
                <Cat id = "GRd9Gfvb0AQyAu_?" name = "Giselle"/>
                <Cat id = "GRd9LQybIAA75pA?" name = "Winter"/>
                <Cat id = "GRd9RBkb0AAzzTr?" name = "NingNing"/>
            </div>
        </div>
    )
}



export default MainSection;
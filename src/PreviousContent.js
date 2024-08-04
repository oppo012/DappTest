import './MainSection.css';
import Cat from './Cat.js';
import { useState , useEffect} from 'react';
import { ethers } from 'ethers';
import { getJsonWalletAddress } from 'ethers/lib/utils.js';
import ABI from './contractABI.json';


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

    const [subscribed, setSubscribed] = useState(null);
    const [age, setAge] = useState(null);
    const [name, setName] = useState(null);
    const [doubleAge, setDoubleAge] = useState(null);
    const [exclamation, setExclamation] = useState(null);

    const [input, setInput] = useState(null);
    const [input1, setInput1] = useState(null);



    const getData = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();//writing to the blockchain
        const contract = new ethers.Contract("0xFE3645513fBD725901bb4Eccb9702b5A009aee33", ABI, signer);
        
        const subscribedStatus = await contract.subscribed();
        setSubscribed(subscribedStatus.toString());

        const contractAge = await contract.age();
        setAge(contractAge.toString());

        const contractName = await contract.name();
        setName(contractName.toString());

        const contractExclamation = await contract.addExclamation();
        setExclamation(contractExclamation.toString())

        const contractDoubleAge = await contract.doubleAge();
        setDoubleAge(contractDoubleAge.toString());
    }


    const change = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();//writing to the blockchain
        const contract = new ethers.Contract("0xFE3645513fBD725901bb4Eccb9702b5A009aee33", ABI, signer);
        
        const changeEverything = await contract.changeEverything(input,input1);
        const receipt = await changeEverything.wait();//get transaction information
        console.log(receipt);
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
                <button onClick = {getData}>Get Info!</button>
                <p>Subscribed: {subscribed}</p>
                <p>Age: {age}</p>
                <p>Name: {name}</p>
                <p>Double Age: {doubleAge}</p>
                <p>Exclamation: {exclamation}</p>
                
                <p>Enter your name:</p>
                <input value = {input} onInput = {newInfo => setInput(newInfo.target.value)}/>
                <p>Enter your Age:</p>
                <input value = {input1} onInput = {newInfo => setInput1(newInfo.target.value)}/>
                <button onClick={change}>Change information</button>


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
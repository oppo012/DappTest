import './Cat.css';

function Cat(props) {
    return(
        <div>
            <img class = "Cat" src= {"https://pbs.twimg.com/media/" + props.id + "format=jpg&name=4096x4096"}/>
            <p>Name: {props.name }</p>
        </div>
    )

}

export default Cat;
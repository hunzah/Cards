
type PropsType = {
    svg:string
}

const ComponentWithSvg = (props:PropsType) => {
    return (
       <img src={props.svg}/>
    );
};

export default ComponentWithSvg;
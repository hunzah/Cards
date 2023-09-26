type PropsType = {
  svg: string
}

const ComponentWithSvg = (props: PropsType) => {
  return <img src={props.svg} alt="svg-component" />
}

export default ComponentWithSvg

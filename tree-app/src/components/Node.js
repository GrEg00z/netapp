function Container(props) {
    return (
        <div style={{marginLeft: "15px", cursor: "pointer"}} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
  
export default function Node(props) {
    return (
        <Container onClick={(event) => { props.onNodeClick && props.onNodeClick(props.data); event.stopPropagation()}}>
            {props.data.id === 1 ? <>🌎 </> :
                props.data.isOpened ? <>📂 </> : <>📁 </>
            }
            {props.data.name}
            {props.data.isOpened === true && props.data.children && props.data.children.map(child => {
                return <Node key={child.name} data={child} onNodeClick={props.onNodeClick} />
            })}
        </Container>
    )
}
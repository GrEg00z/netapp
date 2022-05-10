function Container(props) {
    return (
        <div style={{marginLeft: "15px", cursor: "pointer"}} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
  
export default function Nodes(props) {
    return (
        <>
        {props.root &&
            <Container onClick={(event) => { props.onNodeClick && props.onNodeClick(props.root); event.stopPropagation()}}>
                {props.root.id === 1 ? <>🌎 </> :
                    props.root.isOpened ? <>📂 </> : <>📁 </>
                }
                {props.root.name}
                {/*props.data.isOpened === true && */props.root.children && props.root.children.map(child => {
                    return <Nodes key={child.name} root={child} onNodeClick={props.onNodeClick} />
                })}
            </Container>
        }
        </>
    )
}
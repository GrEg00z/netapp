export default function Nodes(props) {

    const onNodeClick = (event, root) => {
        // Toggle class closed to display or hide node
        event.target.classList.toggle("closed")

        if(props.onNodeClick)
            props.onNodeClick(root);

        event.stopPropagation()
    }

    return (
        <Container onClick={(event) => { props.root && onNodeClick(event, props.root)}}>
            {props.isChild ? <>📂 </> : <>🌎 </>}
            {props.root?.name || "..."}
            <Children>
                {props.root && props.root.children && props.root.children.map(child => {
                    return <Nodes key={child.name} root={child} onNodeClick={props.onNodeClick} isChild />
                })}
            </Children>
        </Container>
    )
}

function Container(props) {
    return (
        <div className="node_container closed" onClick={props.onClick}>
            {props.children}
        </div>
    )
}

function Children(props) {
    return (
        <div className="children">
            {props.children}
        </div>
    )
}
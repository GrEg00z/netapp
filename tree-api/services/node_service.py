from sqlalchemy import select
from model.node import Node, Edge
from session import Session

# get edges/children by node id
def get_edges_service(node_id):
    edges = []
    with Session() as session:
        stmt = select(Node).join(Edge.child).where(Edge.parent_id == node_id)
        for edge in session.scalars(stmt):
            edge_data = {}
            edge_data["id"] = edge.node_id
            edge_data["name"] = edge.node_name
            edges.append(edge_data)

    return edges

# get root node
def get_root_service():
    node_data = {}
    with Session() as session:
        stmt = select(Node).where(Node.node_id == 1)
        node = session.scalars(stmt).first()
        if node is not None:
            node_data["id"] = node.node_id
            node_data["name"] = node.node_name

    return node_data

# load nodes
def load_service():
    with Session() as session:
        node1 = Node(node_id=1, node_name="winterfell.westeros.got")
        node2 = Node(node_id=2, node_name="Computers")
        node3 = Node(node_id=3, node_name="Domain Controllers")
        node4 = Node(node_id=4, node_name="TheWall")
        node5 = Node(node_id=5, node_name="Kylo-Ou")
        edge = Edge(parent_id=1, child_id=2)
        edge1 = Edge(parent_id=1, child_id=3)
        edge2 = Edge(parent_id=1, child_id=4)
        edge3 = Edge(parent_id=4, child_id=5)

        # empty database
        session.query(Edge).delete()
        session.query(Node).delete()
        session.commit()

        session.add_all([node1, node2, node3, node4, node5, edge, edge1, edge2, edge3])
        session.commit()

    return True
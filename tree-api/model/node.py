from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from session import engine

Base = declarative_base()

class Node(Base):
    __tablename__ = "nodes"
    node_id = Column(Integer, primary_key=True)
    node_name = Column(String(30))

class Edge(Base):
    __tablename__ = "edges"
    parent_id = Column(Integer, ForeignKey('nodes.node_id'), nullable=False)
    child_id = Column(Integer, ForeignKey('nodes.node_id'), primary_key=True, nullable=False)
    
    child = relationship("Node", foreign_keys=[child_id])
    parent = relationship("Node", foreign_keys=[parent_id])

Base.metadata.create_all(engine)
from flask import Blueprint, jsonify, make_response
from services.node_service import get_root_service, get_edges_service, load_service

node_route = Blueprint('node_route', __name__)

@node_route.route("/api/v1/nodes/<node_id>/edges", methods=['GET'])
def get_edges(node_id):
    try:
        return jsonify(get_edges_service(node_id))
    except Exception as e:
        return make_response({'error' : str(e)}, 404)

@node_route.route("/api/v1/nodes/root", methods=['GET'])
def get_root():
    try:
        return jsonify(get_root_service())
    except Exception as e:
        return make_response({'error' : str(e)}, 404)    

@node_route.route("/api/v1/nodes/load", methods=['GET'])
def load():
    try:
        return jsonify(load_service())
    except Exception as e:
        return make_response({'error' : str(e)}, 404)  
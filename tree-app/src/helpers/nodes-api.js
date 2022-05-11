import { get } from './http';

const baseRoute = process.env.REACT_APP_TREE_API_URL + "/nodes";

export async function getRoot() {
    return get(baseRoute + "/root");
}

export async function getChildrenById(nodeId) {
    return get(baseRoute + "/" + nodeId + "/edges");
}

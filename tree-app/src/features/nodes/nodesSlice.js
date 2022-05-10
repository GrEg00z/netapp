import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../helpers/http';

export const fetchNodeRoot = createAsyncThunk(
    'nodes/fetchRoot',
    async () => {
        const response = await get("http://127.0.0.1:5000/api/v1/nodes/root")
        return response;
    }
)

export const fetchNodeChildrenById = createAsyncThunk(
    'nodes/children/fetchById',
    async (node) => {
        const response = await get("http://127.0.0.1:5000/api/v1/nodes/" + node.id + "/edges")
        return {
            nodeId : node.id,
            children: response
        };
    },
    {
        condition: (node, {getState}) => {
            // do not fetch data if fetching or already loaded
            let fetching = getState().nodes.fetching;
            return !fetching && !Array.isArray(node.children);
        }
    }
)

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
      root: null,
      fetching: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNodeRoot.fulfilled, (state, action) => {
        state.root = action.payload;
    })
    builder.addCase(fetchNodeChildrenById.pending, (state, action) => {
        state.fetching = true;
    })
    builder.addCase(fetchNodeChildrenById.fulfilled, (state, action) => {
        state.fetching = false;
        updateChildrenByNodeId([state.root], action.payload.nodeId, action.payload.children)
    })
  }
})

const updateChildrenByNodeId = (nodes, nodeId, children) => {
    nodes.forEach((node) => {
        if(node.id === nodeId) {
            node.children = children;
        }
        else if(node.children)
            updateChildrenByNodeId(node.children, nodeId, children)
    })
}

export default nodesSlice.reducer
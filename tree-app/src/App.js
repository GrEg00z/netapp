import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import { fetchNodeRoot, fetchNodeChildrenById } from './features/nodes/nodesSlice'
import Nodes from './components/Nodes';

function App() {

  const root = useSelector(state => state.nodes.root)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNodeRoot())
  }, [dispatch])

  const onNodeClick = (node) => {
    dispatch(fetchNodeChildrenById(node))
  }

  return (
      <Nodes root={root} onNodeClick={onNodeClick} />
  );
}

export default App;

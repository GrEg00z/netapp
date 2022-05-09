import {useState, useEffect} from 'react';
import {get} from './helpers/http';
import Node from './components/Node';

function App() {

  const [root, setRoot] = useState(null)

  useEffect(() => {
    get("http://127.0.0.1:5000/api/v1/nodes/root").then((root_data) => {
      console.log("root data : ", root_data)
      setRoot(root_data)
    })
  }, [])

  const onNodeClick = (node) => {
    if(node.isLoaded !== true && node.isLoading !== true) {
      node.isLoading = true;
      get("http://127.0.0.1:5000/api/v1/nodes/" + node.id + "/edges").then((edges) => {
        console.log("edge data : ", edges)

        setTimeout(() => {
          node.children = [...edges];
          node.isLoaded = true;
          node.isOpened = true;

          setRoot({...root})

          node.isLoading = false;
        }, 1000)
      })
    }

    if(node.isLoaded === true) {
      node.isOpened = !node.isOpened;
      setRoot({...root})
    }
  }

  console.log("render !")

  return (
    <>
    {root &&
      <Node data={root} onNodeClick={onNodeClick} />
    }
    </>
  );
}

export default App;

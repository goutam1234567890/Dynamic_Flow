import React, { Component } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'react-flow-renderer';
import './App.css';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: initialNodes,
      edges: initialEdges,
      nodeIdToRemove: '',
      editNodeId: '',
      editNodeLabel: '',
      editEdgeId: '',
      editEdgeSource: '',
      editEdgeTarget: '',
    };
  }

  addNode = () => {
    const newNode = {
      id: (this.state.nodes.length + 1).toString(),
      data: { label: `Node ${this.state.nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    this.setState((prevState) => ({
      nodes: [...prevState.nodes, newNode],
    }));
  };

  onConnect = (params) => {
    this.setState((prevState) => ({
      edges: addEdge(params, prevState.edges),
    }));
  };

  removeNode = (id) => {
    this.setState((prevState) => ({
      nodes: prevState.nodes.filter((node) => node.id !== id),
      edges: prevState.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      nodeIdToRemove: '',
    }));
  };

  editNode = () => {
    const { editNodeId, editNodeLabel } = this.state;
    this.setState((prevState) => ({
      nodes: prevState.nodes.map((node) =>
        node.id === editNodeId ? { ...node, data: { ...node.data, label: editNodeLabel } } : node
      ),
      editNodeId: '',
      editNodeLabel: '',
    }));
  };

  editEdge = () => {
    const { editEdgeId, editEdgeSource, editEdgeTarget } = this.state;

    // Input validation
    if (!editEdgeId || !editEdgeSource || !editEdgeTarget) {
      alert('Please provide all edge details (ID, Source, Target).');
      return;
    }

    // Find the edge to update
    const edgeIndex = this.state.edges.findIndex((edge) => edge.id === editEdgeId);
    if (edgeIndex === -1) {
      alert(`Edge with ID "${editEdgeId}" does not exist.`);
      return;
    }

    // Check if source and target nodes exist
    const sourceExists = this.state.nodes.some((node) => node.id === editEdgeSource);
    const targetExists = this.state.nodes.some((node) => node.id === editEdgeTarget);
    if (!sourceExists) {
      alert(`Source Node with ID "${editEdgeSource}" does not exist.`);
      return;
    }
    if (!targetExists) {
      alert(`Target Node with ID "${editEdgeTarget}" does not exist.`);
      return;
    }

    // Update the edge in state
    this.setState((prevState) => ({
      edges: [
        ...prevState.edges.slice(0, edgeIndex),
        { ...prevState.edges[edgeIndex], source: editEdgeSource, target: editEdgeTarget },
        ...prevState.edges.slice(edgeIndex + 1),
      ],
      editEdgeId: '',
      editEdgeSource: '',
      editEdgeTarget: '',
    }));

    alert(`Edge "${editEdgeId}" has been updated successfully.`);
  };

  onNodesChange = (changes) => {
    this.setState((prevState) => ({
      nodes: prevState.nodes.map((node) => {
        const change = changes.find((c) => c.id === node.id);
        return change ? { ...node, ...change } : node;
      }),
    }));
  };

  render() {
    return (
      <ReactFlowProvider>
        <div className="app">
          <div className="sidebar">
            <button onClick={this.addNode}>Add Node</button>
            <input
              type="text"
              placeholder="Enter Node ID to Remove"
              value={this.state.nodeIdToRemove}
              onChange={(e) => this.setState({ nodeIdToRemove: e.target.value })}
            />
            <button onClick={() => this.removeNode(this.state.nodeIdToRemove)}>
              Remove Node
            </button>

            <h4>Edit Node</h4>
            <input
              type="text"
              placeholder="Node ID"
              value={this.state.editNodeId}
              onChange={(e) => this.setState({ editNodeId: e.target.value })}
            />
            <input
              type="text"
              placeholder="New Label"
              value={this.state.editNodeLabel}
              onChange={(e) => this.setState({ editNodeLabel: e.target.value })}
            />
            <button onClick={this.editNode}>Edit Node</button>

            <h4>Edit Edge</h4>
            <input
              type="text"
              placeholder="Edge ID"
              value={this.state.editEdgeId}
              onChange={(e) => this.setState({ editEdgeId: e.target.value })}
            />
            <input
              type="text"
              placeholder="New Source"
              value={this.state.editEdgeSource}
              onChange={(e) => this.setState({ editEdgeSource: e.target.value })}
            />
            <input
              type="text"
              placeholder="New Target"
              value={this.state.editEdgeTarget}
              onChange={(e) => this.setState({ editEdgeTarget: e.target.value })}
            />
            <button onClick={this.editEdge}>Edit Edge</button>
          </div>

          <div className="diagram">
            <ReactFlow
              nodes={this.state.nodes}
              edges={this.state.edges}
              onConnect={this.onConnect}
              onNodesChange={this.onNodesChange}
              fitView
              style={{ width: '100%', height: '90vh' }}
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
    );
  }
}

export default App;

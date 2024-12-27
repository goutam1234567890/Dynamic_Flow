React Flow Editor

A React-based interactive flow editor using the react-flow-renderer library. This application allows users to dynamically create, edit, and manage nodes and edges in a flow diagram.

Features

Add Nodes: Dynamically add new nodes to the diagram with random positions.
Remove Nodes: Remove nodes by specifying the Node ID. Connected edges are automatically removed.
Edit Node Labels: Modify the label of a specific node using its ID.
Add Edges: Automatically add edges between nodes by dragging a connection from one node to another.
Edit Edges: Update edge details like source and target nodes by specifying the Edge ID, source node, and target node.

React Flow Controls:

Includes a MiniMap, zoom controls, and a background grid for better navigation.

State Management: The app uses React's state to manage nodes and edges dynamically.

Use the sidebar to:

Add Node: Click the "Add Node" button to create a new node.
Remove Node: Enter a Node ID in the input field and click "Remove Node" to delete the node and its connected edges.
Edit Node: Enter the Node ID and a new label, then click "Edit Node" to update the node label.
Edit Edge: Enter the Edge ID, Source Node ID, and Target Node ID, then click "Edit Edge" to update the edge.
Interact with the flow diagram to connect nodes or move them around.

Project Structure
App.js: Contains the main logic for adding, removing, and editing nodes and edges.
App.css: Styles for the application layout.

Dependencies:
react-flow-renderer: Provides the flow diagram and its interactive features.

Key Functions

addNode: Adds a new node with an auto-generated ID and random position.
removeNode: Removes a specified node by ID and all its connected edges.
editNode: Edits a node's label using its ID.
editEdge: Updates an edge's source or target using its ID.

Dependencies

React: Frontend framework for building the UI.
react-flow-renderer: Library for creating and managing flow diagrams.
CSS: For basic styling.

Known Issues

Ensure Edge IDs and Node IDs are unique when editing edges or nodes.
Input validation ensures valid Node IDs and Edge IDs are used.

Future Enhancements

Add functionality for saving and loading diagrams.
Enhance the UI for selecting nodes and edges for editing.
Provide drag-and-drop support for creating edges directly.

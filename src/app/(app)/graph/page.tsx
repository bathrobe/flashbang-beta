'use client'
import Dagre from '@dagrejs/dagre'
import React, { useEffect } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

const getLayoutedElements = (nodes, edges) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'LR' }) // Set horizontal layout

  edges.forEach((edge) => g.setEdge(edge.source, edge.target))
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 150,
      height: node.measured?.height ?? 50,
    }),
  )

  Dagre.layout(g)

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id)
      return { ...node, position: { x, y } }
    }),
    edges,
  }
}

const LayoutFlow = () => {
  const { fitView } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const layouted = getLayoutedElements(nodes, edges)
    setNodes([...layouted.nodes])
    setEdges([...layouted.edges])
    setTimeout(() => fitView(), 0)
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    />
  )
}

export default function App() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  )
}

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position: { x: 0, y: 100 },
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position: { x: 0, y: 200 },
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position: { x: 0, y: 300 },
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position: { x: 0, y: 400 },
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position: { x: 0, y: 500 },
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position: { x: 200, y: 100 },
  },
]

export const initialEdges = [
  { id: 'e12', source: '1', target: '2', animated: true },
  { id: 'e13', source: '1', target: '3', animated: true },
  { id: 'e22a', source: '2', target: '2a', animated: true },
  { id: 'e22b', source: '2', target: '2b', animated: true },
  { id: 'e22c', source: '2', target: '2c', animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', animated: true },
]

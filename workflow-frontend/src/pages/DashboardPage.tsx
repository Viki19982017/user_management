import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Page,
  Card,
  Button,
  BlockStack,
  Layout,
  Banner,
} from "@shopify/polaris";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

const apiUrl =
  (process.env.REACT_APP_API_URL as string) || "http://localhost:3001";

const initialNodes: Node[] = [
  {
    id: "in",
    position: { x: 50, y: 100 },
    data: { label: "Input" },
    type: "input",
  },
  {
    id: "out",
    position: { x: 450, y: 100 },
    data: { label: "Output" },
    type: "output",
  },
];

const DashboardPage: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<any[]>([]);

  console.log("nodes", nodes);
  console.log("initialNodes", initialNodes);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const saveWorkflow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${apiUrl}/workflows`, {
        name: "My Workflow",
        data: { nodes, edges },
      });
      await fetchWorkflows();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const validateWorkflow = async () => {
    try {
      const res = await axios.post(`${apiUrl}/workflows/validate`, {
        data: { nodes, edges },
      });
      const v = res.data;
      if (!v.valid) {
        setError(
          `Invalid: require input=${String(
            v.requirements.hasInput
          )}, output=${String(v.requirements.hasOutput)}, allConnected=${String(
            v.requirements.allConnected
          )}`
        );
      } else {
        setError(null);
      }
    } catch (e: any) {
      setError("Validation failed");
    }
  };

  const fetchWorkflows = async () => {
    const res = await axios.get(`${apiUrl}/workflows`);
    setWorkflows(res.data);
  };

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  useEffect(() => {
    fetchWorkflows().catch(() => {});
  }, []);

  return (
    <Page title="Flow Editor">
      <Layout>
        <Layout.Section>
          {error && (
            <Banner tone="critical" onDismiss={() => setError(null)}>
              {error}
            </Banner>
          )}
          <Card>
            <div style={{ height: 400 }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
              >
                <MiniMap />
                <Controls />
                <Background />
              </ReactFlow>
            </div>
            <BlockStack gap="200">
              <Button onClick={validateWorkflow}>Validate</Button>
              <Button
                variant="primary"
                onClick={saveWorkflow}
                loading={loading}
              >
                Save
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            {workflows.length === 0 ? (
              <p>No workflows yet.</p>
            ) : (
              <ul>
                {workflows.map((w) => (
                  <li key={w.id}>{w.name}</li>
                ))}
              </ul>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default DashboardPage;

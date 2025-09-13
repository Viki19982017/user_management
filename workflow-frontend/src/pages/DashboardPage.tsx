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
import Modal from "../components/modal";
import { defaultDropDownOptions, defaultNode, defaultNodes } from "../constant";
import Dropdown from "../components/dropdown";
import TextInput from "../components/textinput";
import Label from "../components/label";

const apiUrl =
  (process.env.REACT_APP_API_URL as string) || "http://localhost:3001";

const nodeColor = (node: Node) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

const DashboardPage: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(defaultNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [singleValue, setSingleValue] = useState<string | number>("");
  const [basicValue, setBasicValue] = useState("");

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
          <Button variant="primary" onClick={() => setOpen(true)}>
            + Add Node
          </Button>
          <Modal
            isOpen={open}
            onClose={() => {
              setOpen(false);
            }}
            title="Add Node"
            size="medium"
          >
            <div className="dashboardModal">
              <Dropdown
                options={defaultDropDownOptions}
                value={singleValue}
                onChange={(value) => setSingleValue(value as string)}
                placeholder="Select an option..."
                label="Node Selection"
                helperText=""
              />
              <TextInput
                value={basicValue}
                onChange={(value) => setBasicValue(value)}
                placeholder="Enter some text..."
                label="Basic Input"
                helperText=""
                clearable
              />
              <Button
                variant="primary"
                onClick={() => {
                  defaultNode.data.label = basicValue;
                  if (singleValue === "input") {
                    defaultNode.type = "input";
                  } else if (singleValue === "output") {
                    defaultNode.type = "output";
                  } else {
                    delete defaultNode.type;
                  }
                  const newNode = { ...defaultNode, id: `in${nodes.length}` };
                  setNodes((nodes) => [...nodes, newNode]);
                  setOpen(false);
                }}
              >
                Add Node
              </Button>
            </div>
          </Modal>
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
                <MiniMap
                  nodeColor={nodeColor}
                  nodeStrokeWidth={3}
                  nodeStrokeColor="#000"
                  zoomable
                  pannable
                />
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
            {nodes.length === 0 ? (
              <p>No nodes yet.</p>
            ) : (
              <div>
                <p>
                  <b>Current Node Info</b>
                </p>
                {nodes.map((n) => (
                  <Label
                    key={n.id}
                    removable
                    editable
                    onRemove={() => {}}
                    onEdit={() => {
                      console.log(`Edit node: ${n.data.label}`);
                    }}
                  >
                    {n.data.label}
                  </Label>
                ))}
              </div>
            )}
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            {workflows.length === 0 ? (
              <p>No workflows yet.</p>
            ) : (
              <ul>
                {workflows.map((w) => (
                  <li key={w.id}>
                    <div>
                      <span>{w.name}</span>
                      <button
                        type="button"
                        className="label-edit"
                        onClick={() => {}}
                        disabled={false}
                        aria-label="Edit label"
                        tabIndex={-1}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M8.5 1.5a1.414 1.414 0 0 1 2 2L9 5l-2-2 1.5-1.5zM7 3L2 8v2h2l5-5-2-2z"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="label-edit"
                        onClick={() => {}}
                        disabled={false}
                        aria-label="Edit label"
                        tabIndex={-1}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M9 3L3 9M3 3L9 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
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

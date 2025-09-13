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
import { useNavigate } from "react-router-dom";
import "reactflow/dist/style.css";
import axios from "axios";
import Modal from "../../components/modal";
import {
  defaultDropDownOptions,
  defaultNode,
  defaultNodes,
} from "../../constant";
import Dropdown from "../../components/dropdown";
import TextInput from "../../components/textinput";
import Label from "../../components/label";
import "./Dashboard.css";

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
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>(defaultNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [singleValue, setSingleValue] = useState<string | number>("");
  const [basicValue, setBasicValue] = useState("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(-1);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const saveWorkflow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${apiUrl}/workflows`, {
        name: name,
        data: { nodes, edges },
      });
      await fetchWorkflows();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const updateWorkflow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${apiUrl}/workflows/${currentNode?.id}`, {
        name: name,
        data: { nodes, edges },
      });
      await fetchWorkflows();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkflow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`${apiUrl}/workflows/${currentNode?.id}`);
      await fetchWorkflows();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const validateWorkflow = async (validate: boolean) => {
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
        setSuccess(null);
      } else {
        setSuccess("Workflow validated successfully");
        if (!validate) {
          currentNode ? updateWorkflow() : saveWorkflow();
          setName("");
        }
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

  const createOrUpdateNode = () => {
    if (isEdit) {
      updateNode();
    } else {
      createNode();
    }
  };

  const updateNode = () => {
    nodes[currentNodeIndex].data.label = basicValue;
    if (singleValue === "input") {
      nodes[currentNodeIndex].type = "input";
    } else if (singleValue === "output") {
      nodes[currentNodeIndex].type = "output";
    } else {
      delete nodes[currentNodeIndex].type;
    }
    setNodes((nodes) => [...nodes]);
    resetNodeForm();
  };

  const createNode = () => {
    const node = JSON.parse(JSON.stringify(defaultNode));
    node.data.label = basicValue;
    if (singleValue === "input") {
      node.type = "input";
    } else if (singleValue === "output") {
      node.type = "output";
    } else {
      delete node.type;
    }
    const newNode = { ...node, id: `in${nodes.length + 1}` };
    setNodes([...nodes, newNode]);
    resetNodeForm();
  };

  const resetNodeForm = () => {
    setCurrentNodeIndex(-1);
    setSingleValue("");
    setBasicValue("");
    setIsEdit(false);
    setOpen(false);
  };

  const resetForm = () => {
    setName("");
    setError(null);
    setCurrentNode(null);
    setNodes(JSON.parse(JSON.stringify(defaultNodes)));
    setEdges([]);
  };

  useEffect(() => {
    fetchWorkflows().catch(() => {});
  }, []);

  return (
    <Page
      title="Flow Editor"
      secondaryActions={[
        {
          content: "Logout",
          accessibilityLabel: "Logout from the Application",
          onAction: () => {
            localStorage.clear();
            navigate("/login");
          },
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          {error && (
            <Banner tone="critical" onDismiss={() => setError(null)}>
              {error}
            </Banner>
          )}
          {success && (
            <Banner tone="success" onDismiss={() => setSuccess(null)}>
              {success}
            </Banner>
          )}
          <Button variant="primary" onClick={() => setOpen(true)}>
            + Add Node
          </Button>
          <Button
            onClick={() => {
              resetForm();
            }}
          >
            New
          </Button>
          <Modal
            isOpen={openDelete}
            onClose={() => {
              setOpenDelete(false);
            }}
            title="Delete Workflow"
            size="medium"
          >
            <div className="dashboardModal">
              <p>Are you sure you want to delete this workflow?</p>
              <p className="header">
                Workflow Name: <span className="deleteWorkFlow">{name}</span>
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  deleteWorkflow();
                  setOpenDelete(false);
                  resetForm();
                }}
              >
                Delete
              </Button>
            </div>
          </Modal>
          <Modal
            isOpen={show}
            onClose={() => {
              setShow(false);
            }}
            title={currentNode ? "Edit Workflow" : "Add Workflow"}
            size="medium"
          >
            <div className="dashboardModal">
              <TextInput
                value={name}
                onChange={(value) => setName(value)}
                placeholder="Enter some text..."
                label="Workflow Name"
                helperText=""
                clearable
              />
              <Button
                variant="primary"
                onClick={() => {
                  validateWorkflow(false);
                  setShow(false);
                }}
              >
                Save
              </Button>
            </div>
          </Modal>
          <Modal
            isOpen={open}
            onClose={() => {
              resetNodeForm();
            }}
            title={isEdit ? "Edit Node" : "Add Node"}
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
                label="Node Name"
                helperText=""
                clearable
              />
              <Button variant="primary" onClick={createOrUpdateNode}>
                {isEdit ? "Update Node" : "Add Node"}
              </Button>
            </div>
          </Modal>
          <Card>
            <div style={{ height: 400 }}>
              {!open && (
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
              )}
            </div>
            <BlockStack gap="200">
              <Button onClick={() => validateWorkflow(true)}>Validate</Button>
              <Button
                variant="primary"
                onClick={() => setShow(true)}
                loading={loading}
              >
                {!currentNode ? "Create Workflow" : "Update Workflow"}
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
                {nodes.map((n, index) => (
                  <Label
                    key={n.id}
                    removable
                    editable
                    onRemove={() => {
                      edges.forEach((item, index) => {
                        if (item.source === n.id) {
                          edges.splice(index, 1);
                        }
                        if (item.target === n.id) {
                          edges.splice(index, 1);
                        }
                      });
                      nodes.splice(index, 1);
                      setNodes([...nodes]);
                      setEdges([...edges]);
                    }}
                    onEdit={() => {
                      setBasicValue(n.data.label);
                      setSingleValue(n.type as string);
                      setCurrentNodeIndex(index);
                      setIsEdit(true);
                      setOpen(true);
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
              <div>
                <p>
                  <b>Workflows:</b>
                </p>
                <div className="dashboardModal">
                  {workflows.map((w) => (
                    <Label
                      key={w.id}
                      removable
                      editable
                      onRemove={() => {
                        setName(w.name);
                        setCurrentNode(w);
                        setNodes(w.data.nodes);
                        setEdges(w.data.edges);
                        setOpenDelete(true);
                      }}
                      onEdit={() => {
                        setName(w.name);
                        setCurrentNode(w);
                        setNodes(w.data.nodes);
                        setEdges(w.data.edges);
                      }}
                    >
                      {w.name}
                    </Label>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default DashboardPage;

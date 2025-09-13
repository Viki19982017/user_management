import React, { useState } from "react";
import {
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
  Button,
  InlineError,
  Link,
} from "@shopify/polaris";
import { useAuth } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Login">
      <Card>
        <Form onSubmit={onSubmit}>
          <FormLayout>
            <TextField
              label="Email"
              value={email}
              onChange={setEmail}
              type="email"
              autoComplete="email"
            />
            <TextField
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
              autoComplete="current-password"
            />
            {error && <InlineError message={error} fieldID="login-error" />}
            <Button variant="primary" submit loading={loading}>
              Login
            </Button>
            <div>
              <Link url="/register">Create an account</Link>
            </div>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
};

export default LoginPage;

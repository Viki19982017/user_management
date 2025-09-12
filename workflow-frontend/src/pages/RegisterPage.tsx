import React, { useState } from "react";
import { LegacyCard, Form, FormLayout, Page, TextField, Button, InlineError, Link } from "@shopify/polaris";
import { useAuth } from "../state/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await register(email, password);
      navigate("/");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Register">
      <LegacyCard sectioned>
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
              autoComplete="new-password"
            />
            {error && <InlineError message={error} fieldID="register-error" />}
            <Button variant="primary" submit loading={loading}>
              Create account
            </Button>
            <div>
              <Link url="/login">Have an account? Login</Link>
            </div>
          </FormLayout>
        </Form>
      </LegacyCard>
    </Page>
  );
};

export default RegisterPage;

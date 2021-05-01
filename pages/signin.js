import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Input, FormGroup, Label } from 'reactstrap';
import PropType from 'proptypes';
import { useRouter } from 'next/router';
import Meta from 'components/Meta';
import { signIn, useSession } from 'next-auth/client';

export default function SignIn({ callbackUrl }) {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();
  const validEmail = email.length > 0 && validateEmail(email);
  const submit = (e) => {
    e.preventDefault();
    if (!validEmail) return false;
    signIn('email', { email, callbackUrl });
  };

  useEffect(() => {
    if (!loading && session) return router.push('/');
    setVisible(true);
  });

  return (
    <div className="container py-5">
      <Meta title={'Sign in | NVC Social Change'} />

      <Form onSubmit={submit}>
        <Row form>
          {visible && (
            <Col md={5} className="mx-auto">
              <FormGroup>
                <h1>Sign in</h1>
                <div className="mb-5 mt-3">
                  Sign-in in order to add social change projects where NVC has
                  been a part of
                </div>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="with a placeholder"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <Button
                color={validEmail ? 'primary' : 'secondary'}
                disabled={!validEmail}
                onClick={submit}>
                Sign in
              </Button>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
}

SignIn.propTypes = {
  callbackUrl: PropType.string,
};

export async function getServerSideProps() {
  return {
    props: { callbackUrl: process.env.NEXTAUTH_URL },
  };
}

function validateEmail(email) {
  const re = /.+@.+\..+/;
  return re.test(email);
}

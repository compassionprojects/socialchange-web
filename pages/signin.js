import React, { useState } from 'react';
import { Button, Form, Row, Col, Input, FormGroup, Label } from 'reactstrap';
// import PropType from 'proptypes';
import Meta from 'components/Meta';
import { signIn } from 'next-auth/client';

export default function SignIn() {
  // const { user, projects } = props;
  const [email, setEmail] = useState('');
  return (
    <div className="container py-5">
      <h1>Sign in</h1>
      <Meta title={'Sign in | NVC Social Change'} />
      Sign-in in order to add social change projects where NVC has been a part
      of
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="with a placeholder"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={() => signIn('email', { email })}>Sign in</Button>
      </Form>
    </div>
  );
}

/* Users.propTypes = {
  user: PropType.object,
  projects: PropType.array,
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const ures = await fetch(`${process.env.API_ROOT}/api/users/${id}`);
  const user = await ures.json();

  const pres = await fetch(`${process.env.API_ROOT}/api/projects?user=${id}`);
  const projects = await pres.json();

  return {
    props: { user, projects },
  };
}
 */

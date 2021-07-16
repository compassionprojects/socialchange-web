import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'components/Link';

export default function ProjectNav() {
  const { query, asPath } = useRouter();
  const projectPath = `/projects/${query.project_id}`;

  return (
    <ListGroup>
      <ListGroupItem
        active={asPath === `${projectPath}/edit`}
        tag={Link}
        href="/projects/[project_id]/edit"
        as={`${projectPath}/edit`}
        action>
        Edit
      </ListGroupItem>
      <ListGroupItem
        active={asPath === `${projectPath}/settings`}
        tag={Link}
        href="/projects/[project_id]/settings"
        as={`${projectPath}/settings`}
        action>
        Settings
      </ListGroupItem>
    </ListGroup>
  );
}

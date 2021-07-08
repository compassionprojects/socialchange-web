import React from 'react';
import { Input, Button } from 'reactstrap';
import { useRouter } from 'next/router';

export default function SearchBox(props) {
  const {
    query: { q },
  } = useRouter();
  return (
    <form action="/projects/search" {...props}>
      <div className="d-flex">
        <Input
          required
          placeholder="Search projects"
          type="search"
          className="mr-1"
          name="q"
          defaultValue={q}
        />
        <Button color="primary" type="submit" className="flex-shrink-0">
          Search
        </Button>
      </div>
    </form>
  );
}

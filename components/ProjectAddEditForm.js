import React, { useState } from 'react';
import PropTypes from 'proptypes';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { Button, FormGroup as _FormGroup, Label, FormText } from 'reactstrap';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from 'react-datepicker';
import opencage from 'opencage-api-client';
import { OnChange } from 'react-final-form-listeners';
import Link from 'components/Link';
import moment from 'moment';
import { mapCountry } from '../lib';
import dynamic from 'next/dynamic';

const Map = dynamic(import('components/Map'), {
  ssr: false,
  loading: function Loading() {
    return <div className="text-center py-5 my-5">Loading...</div>;
  },
});

// @todo use AutoSave with localStorage
// https://codesandbox.io/s/5w4yrpyo7k?file=/AutoSave.js

export default function ProjectAddEditForm({ onSubmit, project, categories }) {
  const [geography, setGeo] = useState(
    project.geo ? JSON.parse(project.geo) : null
  );
  const updateCountry = async (value) => {
    const { results } = await opencage.geocode({
      q: mapCountry[value],
      key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
    });
    setGeo({
      type: 'Point',
      coordinates: [results[0].geometry.lat, results[0].geometry.lng],
    });
  };
  const updateGeo = ({ lat, lng }) => {
    setGeo({
      type: 'Point',
      coordinates: [lat, lng],
    });
  };

  return (
    <Form
      onSubmit={(p) => {
        onSubmit({
          ...p,
          geo: geography,
          start_date: moment(p.start_date).toISOString(),
        });
      }}
      initialValues={{ ...project }}
      validate={(values) => {
        const errors = {};
        if (!values.title) errors.title = 'Required';
        if (!values.description) errors.description = 'Required';
        if (!values.start_date) errors.start_date = 'Required';
        return errors;
      }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Field
              name="title"
              required
              component="input"
              className="form-control"
              type="text"
              id="title"
              placeholder="Project title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Field
              name="description"
              required
              component="textarea"
              className="form-control"
              rows={6}
              type="text"
              id="description"
              placeholder="A brief description of the project, situation in which NVC was introduced"
            />
            <FormText color="muted">Give some pointers here</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="intentions">Intentions</Label>
            <Field
              name="intentions"
              component="textarea"
              className="form-control"
              rows={4}
              type="text"
              id="intentions"
              placeholder="The intentions and goals of using Nonviolent Communication in the project"
            />
            <FormText color="muted">Give some pointers here</FormText>
          </FormGroup>
          <Field name="country">
            {({ input }) => (
              <FormGroup>
                <Label for="country">Country</Label>
                <CountryDropdown
                  {...input}
                  valueType="short"
                  required
                  className="form-control"
                  id="country"
                  defaultOptionLabel="-- Select Country --"
                />
              </FormGroup>
            )}
          </Field>
          <OnChange name="country">{updateCountry}</OnChange>
          {geography && (
            <Map
              position={geography.coordinates}
              onEdit={updateGeo}
              zoom={10}
            />
          )}
          <Field name="category_id">
            {({ input }) => (
              <FormGroup>
                <Label for="category_id">Category</Label>
                <select
                  {...input}
                  required
                  className="form-control"
                  id="category_id">
                  <option>-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            )}
          </Field>
          <Field name="start_date">
            {({ input }) => (
              <FormGroup>
                <Label for="start_date">Start Date</Label>
                <div>
                  <DatePicker
                    selected={moment(input.value).toDate()}
                    maxDate={new Date()}
                    onChange={(date) => {
                      // On Change, you should use final-form
                      // Field Input prop to change the value
                      if (moment(date).isValid()) {
                        input.onChange(moment(date));
                      } else {
                        input.onChange(null);
                      }
                    }}
                    required
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    id="start_date"
                    placeholderText="Project start date"
                  />
                </div>
              </FormGroup>
            )}
          </Field>
          <Field name="end_date">
            {({ input }) => (
              <FormGroup>
                <Label for="end_date">End Date</Label>
                <div>
                  <DatePicker
                    selected={input.value ? moment(input.value).toDate() : null}
                    maxDate={new Date()}
                    minDate={moment(values.start_date).toDate()}
                    onChange={(date) => {
                      // On Change, you should use final-form
                      // Field Input prop to change the value
                      if (moment(date).isValid()) {
                        input.onChange(moment(date));
                      } else {
                        input.onChange(null);
                      }
                    }}
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    id="end_date"
                    placeholderText="Project end date"
                  />
                  <FormText color="muted">
                    Leave blank if the project is ongoing
                  </FormText>
                </div>
              </FormGroup>
            )}
          </Field>
          <FormGroup>
            <Label for="outcomes">Outcomes</Label>
            <Field
              name="outcomes"
              component="textarea"
              className="form-control"
              rows={7}
              type="text"
              id="outcomes"
              placeholder="The outcomes of and after using Nonviolent Communication in the project"
            />
            <FormText color="muted">Give some pointers here</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="societal_change">Observed societal change</Label>
            <Field
              name="societal_change"
              component="textarea"
              className="form-control"
              rows={7}
              type="text"
              id="societal_change"
              placeholder="Observed changes in the society as a consequence of
              using NVC"
            />
            <FormText color="muted">Give some pointers here</FormText>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Field
                name="has_discussions"
                component="input"
                className="form-check-input"
                type="checkbox"
                id="has_discussions"
              />{' '}
              Enable discussions
            </Label>
            <FormText color="muted">
              Allow people to discuss this project (this will enable a
              discussion thread next to the project where people can create
              topics and discuss)
            </FormText>
          </FormGroup>
          <br />
          <Button
            color={(!submitting && 'primary') || 'secondary'}
            type="submit"
            disabled={submitting}>
            {project.id ? 'Update' : 'Submit'}
          </Button>{' '}
          <Link
            className="btn btn-link"
            onClick={(e) => {
              e.preventDefault();
              if (
                !pristine &&
                !window.confirm(
                  'Are you sure? The changes you have made will be lost'
                )
              ) {
                return;
              }

              window.history.back();
            }}
            href="/">
            Cancel
          </Link>
        </form>
      )}
    />
  );
}

ProjectAddEditForm.propTypes = {
  onSubmit: PropTypes.func,
  project: PropTypes.object,
  categories: PropTypes.array,
};

const FormGroup = styled(_FormGroup).attrs({
  className: 'form-group my-5',
})``;

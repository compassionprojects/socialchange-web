import React, { useState } from 'react';
import PropTypes from 'proptypes';
import styled from 'styled-components';
import classnames from 'classnames';
import { Form, Field } from 'react-final-form';
import {
  Button,
  FormGroup as _FormGroup,
  Label,
  FormText,
  FormFeedback,
  Input,
} from 'reactstrap';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from 'react-datepicker';
import opencage from 'opencage-api-client';
import { OnChange } from 'react-final-form-listeners';
import Link from 'components/Link';
import moment from 'moment';
import { mapCountry } from '../lib';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Map = dynamic(import('components/Map'), {
  ssr: false,
  loading: function Loading() {
    return <div className="text-center py-5 my-5">Loading...</div>;
  },
});

// Required fields
const requiredFields = {
  title: 'Title',
  description: 'Description',
  category_id: 'Category',
  country: 'Country',
  start_date: 'Start Date',
};

// @todo AutoSave to localStorage
// https://codesandbox.io/s/5w4yrpyo7k?file=/AutoSave.js

// @todo add beforeunload event handler
// using https://github.com/donavon/use-event-listener

export default function ProjectAddEditForm({ onSubmit, project, categories }) {
  const router = useRouter();
  const [geography, setGeo] = useState(
    project.geo ? JSON.parse(project.geo) : null
  );
  const updateCountry = async (value) => {
    if (!value) {
      return setGeo(null);
    }
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
        if (!values.country) errors.country = 'Required';
        if (!values.category_id) errors.category_id = 'Required';
        if (!values.start_date) errors.start_date = 'Required';
        if (values.website && !/https?:\/\/.+/.test(values.website)) {
          errors.website = 'It should be a proper url, Ex: http://example.com';
        }
        return errors;
      }}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        hasValidationErrors,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field name="title">
            {({ input, meta }) => (
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  required
                  {...input}
                  type="text"
                  id="title"
                  placeholder="Project title"
                  invalid={isInvalid(meta)}
                />
                <Feedback meta={meta} />
              </FormGroup>
            )}
          </Field>
          <Field name="description">
            {({ input, meta }) => (
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  required
                  {...input}
                  type="textarea"
                  rows={6}
                  id="description"
                  placeholder="A brief description of the project, situation in which NVC was introduced"
                  invalid={isInvalid(meta)}
                />
                {/* <FormText color="muted">Give some pointers here</FormText> */}
                <Feedback meta={meta} />
              </FormGroup>
            )}
          </Field>
          <FormGroup>
            <Label for="intentions">Intentions (optional)</Label>
            <Field
              name="intentions"
              component="textarea"
              className="form-control"
              rows={4}
              type="text"
              id="intentions"
              placeholder="The intentions and goals of using Nonviolent Communication in the project"
            />
            {/* <FormText color="muted">Give some pointers here</FormText> */}
          </FormGroup>
          <Field name="country">
            {({ input, meta }) => (
              <FormGroup>
                <Label for="country">Country</Label>
                <CountryDropdown
                  {...input}
                  valueType="short"
                  required
                  className={classnames('form-control', {
                    'is-invalid': isInvalid(meta),
                  })}
                  id="country"
                  defaultOptionLabel="-- Select Country --"
                />
                <Feedback meta={meta} />
              </FormGroup>
            )}
          </Field>
          <OnChange name="country">{updateCountry}</OnChange>
          {geography && (
            <>
              <div className="text-muted text-center small pb-2">
                You can move the marker to adjust the location (it does not need
                to be perfect)
              </div>
              <Map
                position={geography.coordinates}
                onEdit={updateGeo}
                zoom={5}
              />
            </>
          )}
          <Field name="category_id">
            {({ input, meta }) => (
              <FormGroup>
                <Label for="category_id">Category</Label>
                <select
                  {...input}
                  required
                  className={classnames('form-control', {
                    'is-invalid': isInvalid(meta),
                  })}
                  id="category_id">
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <Feedback meta={meta} />
              </FormGroup>
            )}
          </Field>
          <Field name="start_date">
            {({ input, meta }) => (
              <FormGroup>
                <Label for="start_date">Start Date</Label>
                <div className={isInvalid(meta) ? 'is-invalid' : ''}>
                  <DatePicker
                    selected={input.value ? moment(input.value).toDate() : null}
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
                    className={classnames('form-control', {
                      'is-invalid': isInvalid(meta),
                    })}
                    id="start_date"
                    placeholderText="Project start date"
                  />
                </div>
                <Feedback meta={meta} />
              </FormGroup>
            )}
          </Field>
          <Field name="end_date">
            {({ input }) => (
              <FormGroup>
                <Label for="end_date">End Date (optional)</Label>
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
            <Label for="outcomes">Outcomes (optional)</Label>
            <Field
              name="outcomes"
              component="textarea"
              className="form-control"
              rows={7}
              type="text"
              id="outcomes"
              placeholder="The outcomes of and after using Nonviolent Communication in the project"
            />
            {/* <FormText color="muted">Give some pointers here</FormText> */}
          </FormGroup>
          <FormGroup>
            <Label for="societal_change">
              Observed societal change (optional)
            </Label>
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
            {/* <FormText color="muted">Give some pointers here</FormText> */}
          </FormGroup>
          <Field name="num_people">
            {({ input, meta }) => (
              <FormGroup>
                <Label for="num_people">
                  Number of people involved (optional)
                </Label>
                <Input
                  {...input}
                  type="number"
                  id="num_people"
                  placeholder="For example: 20"
                  invalid={isInvalid(meta)}
                />
                <Feedback meta={meta} />
              </FormGroup>
            )}
          </Field>
          <Field name="website">
            {({ input, meta }) => (
              <FormGroup>
                <Label for="website">Website (optional)</Label>
                <Input
                  {...input}
                  type="url"
                  pattern="https?://.+"
                  id="website"
                  placeholder="https://example.com"
                  invalid={isInvalid(meta)}
                />
                <Feedback meta={meta} />
              </FormGroup>
            )}
          </Field>
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
            disabled={submitting || hasValidationErrors}>
            {project.id ? 'Update project' : 'Create project'}
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
          {hasValidationErrors && (
            <div className="border border-danger rounded mt-5">
              <ul className="py-4 text-danger mb-0">
                {Object.keys(errors).map((key) => (
                  <li key={key}>
                    {requiredFields[key]} is {errors[key]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <br />
          {/* @todo collect reason for archiving */}
          {/* @todo display archived project separately */}
          {/* @todo do a project deletion separately */}
          {project.id && (
            <Link
              className="btn btn-outline-danger mt-5"
              onClick={async (e) => {
                e.preventDefault();
                if (
                  !window.confirm(
                    'Are you sure you want to archive this project?'
                  )
                ) {
                  return;
                }

                await fetch(`/api/projects/${project.id}/archive`, {
                  method: 'POST',
                });

                router.push('/projects');
                // @todo display notification
              }}
              href="/">
              Archive project
            </Link>
          )}
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

function Feedback({ meta }) {
  return (
    <FormFeedback>{isInvalid(meta) && <span>{meta.error}</span>}</FormFeedback>
  );
}

Feedback.propTypes = {
  meta: PropTypes.object,
};

function isInvalid(meta) {
  return meta.error && meta.modified;
}

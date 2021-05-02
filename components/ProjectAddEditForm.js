import React from 'react';
import PropTypes from 'proptypes';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { Button, FormGroup as _FormGroup, Label, FormText } from 'reactstrap';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from 'react-datepicker';

export default function ProjectAddEditForm({ onSubmit, project, categories }) {
  return (
    <Form
      onSubmit={onSubmit}
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
          {/* <FormSpy
            render={(props) => {
              @todo store form values in localStorage
            }}
          /> */}

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
                />
              </FormGroup>
            )}
          </Field>

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
                    selected={values.start_date || new Date()}
                    maxDate={new Date()}
                    {...input}
                    required
                    showYearDropdown
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
                    selected={values.end_date || new Date()}
                    maxDate={new Date()}
                    minDate={values.start_date}
                    {...input}
                    showYearDropdown
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
            color={(!(submitting || pristine) && 'primary') || 'secondary'}
            type="submit"
            disabled={submitting || pristine}>
            Submit
          </Button>
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

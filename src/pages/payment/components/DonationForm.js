import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Grid, Input, Message } from 'semantic-ui-react';

import formValidator from '../../../utils/donationFormValidator';

const formState = {
  errors: {},
  fields: {
    email: '',
    firstName: '',
    lastName: '',
    purpose: '',
    purposeExtra: '',
    description: '',
    amount: ''
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'form': {
      return { ...state, [action.fieldName]: action.fieldValue };
    }
    case 'formField': {
      const { fieldName, fieldValue } = action;
      const fields = { ...state.fields };
      fields[fieldName] = fieldValue;

      return { ...state, fields };
    }
    default:
      break;
  }
};

const DonationForm = props => {
  const [state, formStateDispatch] = React.useReducer(reducer, formState);

  React.useEffect(() => {
    updateFieldState('purpose', props.donationPurpose.toLowerCase());
  }, [props.donationPurpose]);

  const { fields } = state;
  const formHasErrors = Boolean(Object.keys(state.errors).length);

  const validator = formValidator(fields);

  const currencyOptions = [
    { key: 'i', text: 'Amount', value: 'Amount' },
    { key: 'ngn', text: '₦', value: 'NGN' }
  ];

  const updateFormState = (fieldName, fieldValue) => {
    formStateDispatch({
      type: 'form',
      fieldName,
      fieldValue
    });
  };

  const updateFieldState = (fieldName, fieldValue) => {
    formStateDispatch({
      type: 'formField',
      fieldName,
      fieldValue
    });
  };

  const submit = e => {
    e.preventDefault();
    if (validator.isValid) {
      const payload = {
        email: fields.email,
        amount: fields.amount,
        metadata: {
          custom_fields: [
            {
              display_name: 'Name',
              variable_name: 'name',
              value: `${fields.firstName} ${fields.lastName}`.trim()
            },
            {
              display_name: 'Description',
              variable_name: 'description',
              value: fields.description
            },
            {
              display_name: 'Purpose',
              variable_name: 'purpose',
              value: fields.purpose
            },
            {
              display_name: 'Purpose Extra',
              variable_name: 'purpose_extra',
              value: fields.purposeExtra
            }
          ]
        }
      };
      props.onSubmit(payload);
    } else updateFormState('errors', validator.fieldErrors);
  };

  return (
    <>
      <Grid
        as={Form}
        stackable
        className='payment-form'
        loading={props.loading}
        size='large'
      >
        <Grid.Column>
          <Grid.Row as={Form.Group} widths='equal'>
            <Form.Field
              control={Form.Input}
              label='First Name'
              value={fields.firstName}
              onChange={e => updateFieldState('firstName', e.target.value)}
            />
            <Form.Field
              control={Form.Input}
              label='Last Name'
              value={fields.lastName}
              onChange={e => updateFieldState('lastName', e.target.value)}
            />
          </Grid.Row>
          <Grid.Row
            as={Form.Field}
            control={Form.Input}
            label='Email'
            type='email'
            value={fields.email}
            onChange={e => updateFieldState('email', e.target.value)}
            required
          />
          <Grid.Row as={Form.Group} widths='equal'>
            <Form.Field
              control={Form.Input}
              label='Purpose'
              value={props.donationPurpose}
              readOnly
            />
            {fields.purpose === 'purpose 2' && (
              <>
                <Form.Field
                  control={Form.Input}
                  list='opts'
                  label='Purpose Extra'
                  title='Please provide card number or select none'
                  value={fields.purposeExtra}
                  onChange={e =>
                    updateFieldState('purposeExtra', e.target.value)
                  }
                />
                <datalist id='opts'>
                  <option value='None' />
                </datalist>
              </>
            )}
          </Grid.Row>
          <Grid.Row as={Form.Field} width='16'>
            <Input
              label={{
                basic: true,
                content: (
                  <Dropdown defaultValue='Amount' options={currencyOptions} />
                )
              }}
              labelPosition='left'
              type='number'
              min='0.00'
              step='0.01'
              value={fields.amount}
              onChange={e => updateFieldState('amount', e.target.value)}
              required
            />
          </Grid.Row>
          <Grid.Row
            as={Form.TextArea}
            label='Description'
            rows='10'
            value={fields.description}
            onChange={e => updateFieldState('description', e.target.value)}
          />
          <Form.Button
            color={validator.isValid ? 'green' : 'red'}
            content='Proceed'
            size='huge'
            onClick={submit}
          />
        </Grid.Column>
      </Grid>
      {formHasErrors && (
        <Message list={Object.values(state.errors)} size='huge' error />
      )}
    </>
  );
};

DonationForm.propTypes = {
  donationPurpose: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default DonationForm;

import React from 'react';
import { Container } from "semantic-ui-react";

import DonationForm from './components/DonationForm';
import { createPayment } from "../../requests/payments";

const Donation = props => {
  const [loading, setLoading] = React.useState(false);

  const donationPurpose = props.location.state?.purpose ?? "Other";

  const handleSubmit = async payload => {
    setLoading(true);
    const response = await createPayment(payload);
    if (response.data) {
      window.location.assign(response.data.data.authorization_url);
    } else {
      setLoading(false);
      alert(`An error Ocurred:
        message: ${response.error.message}
        reason: ${response.error.responseBody?.message}
      `);
    }
  };

  return (
    <Container className="page payment">
      <DonationForm donationPurpose={donationPurpose} loading={loading} onSubmit={handleSubmit} />
    </Container>
  );
};

export default Donation;

import React from 'react';
import { useLocation } from 'react-router';
import qs from 'query-string';

import { verifyPayment } from '../../requests/payments';
import { Container, Segment, Header, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ConfirmDonation = () => {
  const [transactionInfo, setTransactionInfo] = React.useState(null);

  const { search } = useLocation();
  const reference = React.useMemo(() => qs.parse(search).reference, [search]);

  React.useEffect(() => {
    (async () => {
      const verificationResponse = await verifyPayment(reference);
      if (verificationResponse.data) {
        setTransactionInfo(verificationResponse.data);
      } else {
        alert(verificationResponse.error.message);
      }
    })();
  }, [reference]);

  if (!transactionInfo) {
    return (
      <Container className='page' textAlign='center'>
        <Segment className='confirmation' basic padded loading>
        </Segment>
      </Container>
    );
  }
  if (transactionInfo.data.status === 'success')
    return (
      <Container className='page' textAlign='center'>
        <Segment className='confirmation' padded>
          <Header as='h2' icon size='huge'>
            <Icon name='check circle' color='green' />
            Payment Complete
            <Header.Subheader>
              Thank you, a confirmation of this transaction (
              {`ref: ${transactionInfo.data.reference}`}) has been sent to your
              email address.
            </Header.Subheader>
          </Header>
          <Divider content={<Link to='/' children='Back to homepage' />} />
        </Segment>
      </Container>
    );

  return (
    <Container className='page' textAlign='center'>
      <Segment className='confirmation' padded>
        <Header as='h2' icon size='huge'>
          <Icon name='remove circle' color='red' />
          Payment Failed
          <Header.Subheader>
            There was an error completing the transaction (
            {`ref: ${transactionInfo.data.reference}`}).
          </Header.Subheader>
        </Header>
        <Divider content={<Link to='/' children='Back to homepage' />} />
      </Segment>
    </Container>
  );
};

export default ConfirmDonation;

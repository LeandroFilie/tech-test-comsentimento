import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NoticesServices from '../../services/NoticesServices';
import Notice from '../Notice';
import Loader from '../Loader';
import EmptyResponse from '../EmptyResponse';
import { Container } from './style';

export default function ListNotice({ onClick }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotices() {
      try {
        const noticesList = await NoticesServices.listNotices();

        setNotices(noticesList.notices);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <Notice
            key={notice.noticeID}
            name={notice.noticeTitle}
            description={notice.noticeDescription}
            date={notice.noticeOpeningDate}
            isOpened={notice.noticeStatus === 'true'}
            onClick={onClick}
          />
        ))
      ) : (
        <EmptyResponse />
      )}
    </Container>
  );
}

ListNotice.propTypes = {
  onClick: PropTypes.func,
};

ListNotice.defaultProps = {
  onClick: undefined,
};

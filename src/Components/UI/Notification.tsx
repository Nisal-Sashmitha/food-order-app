import INotification from '../../models/notification';
import classes from './Notification.module.css';

const Notification:React.FC<{notification:INotification}> = (props) => {
  let specialClasses = '';

  if (props.notification.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.notification.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.notification.title}</h2>
      <p>{props.notification.message}</p>
    </section>
  );
};

export default Notification;
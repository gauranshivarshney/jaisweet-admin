import { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';
import io from 'socket.io-client'

const socket = io('http://jai-sweet-backend.onrender.com')

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [sound] = useState(new Audio('/notification.mp3'))
  const [showList, setShowList] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json()
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on('new_order', (data) => {
      setNotifications(prev => [{ message: data.message, time: data.time }, ...prev])

      sound.play()
    })

    return () => socket.disconnect()
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (id) => {
    await axios.put(`/api/notifications/${id}/read`);
    fetchNotifications();
  };

  const markAllRead = async () => {
    await axios.put(`/api/notifications/mark-all-read`);
    fetchNotifications();
  };

  return (
    <div>
      🔔 Notifications ({notifications.length})
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n.message} - {new Date(n.time).toLocaleTimeString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

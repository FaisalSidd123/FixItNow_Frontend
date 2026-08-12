import {
    UserPlus,
    Wrench,
    Package,
    Bell
} from "lucide-react";

import "./NotificationDropdown.css";

function NotificationDropdown({ notifications = [] }) {

    console.log("Notifications received by dropdown:", notifications);
    return (
        <div className="notification-dropdown">

            <div className="notification-header">
                <div>
                    <h3>Notifications</h3>
                    <p>Recent updates</p>
                </div>

                <Bell size={18} strokeWidth={1.8} />
            </div>

            <div className="notification-list">

                {notifications.length === 0 ? (

                    <div className="notification-empty">
                        <Bell size={20} />
                        <span>No new notifications</span>
                    </div>

                ) : (

                    notifications.slice(0, 5).map((notification, index) => (

                        <div
                            className="notification-item"
                            key={notification.id || index}
                        >

                            <div
                                className={`notification-icon ${
                                    notification.type
                                }`}
                            >
                                {notification.type === "customer" && (
                                    <UserPlus
                                        size={16}
                                        strokeWidth={1.8}
                                    />
                                )}

                                {notification.type === "service" && (
                                    <Wrench
                                        size={16}
                                        strokeWidth={1.8}
                                    />
                                )}

                                {notification.type === "product" && (
                                    <Package
                                        size={16}
                                        strokeWidth={1.8}
                                    />
                                )}
                            </div>

                            <div className="notification-details">

                                <strong>
                                    {notification.title}
                                </strong>

                                <span>
                                    {notification.description}
                                </span>

                                <small>
                                    {notification.time}
                                </small>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default NotificationDropdown;
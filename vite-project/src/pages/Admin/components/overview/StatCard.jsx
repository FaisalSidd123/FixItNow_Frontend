import "./StatCard.css"
function StatCard({ title, value, change, icon, description }) {
    return (
        <div className="stat-card">

            <div className="stat-card-top">

                <div className="stat-icon">
                    {icon}
                </div>

                <span className="stat-menu">•••</span>

            </div>

            <div className="stat-card-content">

                <p>{title}</p>

                <h3>{value}</h3>

                <div className="stat-change">
                    <span>{change}</span>
                    <span>{description}</span>
                </div>

            </div>

        </div>
    );
}

export default StatCard;
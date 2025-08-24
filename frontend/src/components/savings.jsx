export default function Savings() {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>💰 Savings Dashboard</h2>
            
            <div style={styles.statsContainer}>
                <div style={styles.statCard}>
                    <h3 style={styles.statTitle}>Total Savings</h3>
                    <p style={styles.statValue}>$2,450.00</p>
                </div>
                
                <div style={styles.statCard}>
                    <h3 style={styles.statTitle}>Monthly Goal</h3>
                    <p style={styles.statValue}>$500.00</p>
                </div>
                
                <div style={styles.statCard}>
                    <h3 style={styles.statTitle}>Goal Progress</h3>
                    <p style={styles.statValue}>78%</p>
                </div>
            </div>
            
            <div style={styles.progressContainer}>
                <h3 style={styles.sectionTitle}>Savings Goals</h3>
                <div style={styles.goalItem}>
                    <span style={styles.goalLabel}>Emergency Fund</span>
                    <div style={styles.progressBar}>
                        <div style={styles.progressFill}></div>
                    </div>
                    <span style={styles.goalAmount}>$1,200 / $2,000</span>
                </div>
                
                <div style={styles.goalItem}>
                    <span style={styles.goalLabel}>Vacation Fund</span>
                    <div style={styles.progressBar}>
                        <div style={{...styles.progressFill, width: '45%'}}></div>
                    </div>
                    <span style={styles.goalAmount}>$450 / $1,000</span>
                </div>
                
                <div style={styles.goalItem}>
                    <span style={styles.goalLabel}>New Car Fund</span>
                    <div style={styles.progressBar}>
                        <div style={{...styles.progressFill, width: '20%'}}></div>
                    </div>
                    <span style={styles.goalAmount}>$800 / $4,000</span>
                </div>
            </div>
            
            <div style={styles.actionContainer}>
                <button style={styles.actionButton}>Add New Goal</button>
                <button style={{...styles.actionButton, ...styles.secondaryButton}}>View History</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        gap: '15px'
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        flex: '1',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    statTitle: {
        color: '#7f8c8d',
        fontSize: '14px',
        margin: '0 0 10px 0',
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    statValue: {
        color: '#27ae60',
        fontSize: '24px',
        margin: '0',
        fontWeight: 'bold'
    },
    progressContainer: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
        color: '#2c3e50',
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: '600'
    },
    goalItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        gap: '15px'
    },
    goalLabel: {
        minWidth: '120px',
        color: '#34495e',
        fontSize: '14px',
        fontWeight: '500'
    },
    progressBar: {
        flex: '1',
        height: '8px',
        backgroundColor: '#ecf0f1',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3498db',
        width: '60%',
        transition: 'width 0.3s ease'
    },
    goalAmount: {
        minWidth: '100px',
        color: '#7f8c8d',
        fontSize: '12px',
        textAlign: 'right'
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px'
    },
    actionButton: {
        padding: '12px 24px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'background-color 0.3s ease'
    },
    secondaryButton: {
        backgroundColor: '#95a5a6'
    }
};
import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <img
                src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?ga=GA1.1.581496576.1734263052&semt=ais_hybrid&w=740"
                alt="404 Not Found"
                className="mx-auto"
                style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
            />
        </div>
    );
};

export default NotFoundPage;
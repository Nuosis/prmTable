import React from 'react';

const handleRowClick = (item) => {
    const obj = {item, path: 'openHeadlines'}
    FileMaker.PerformScript("headlines * callbacks", JSON.stringify(obj));
};

const Table = ({ data }) => {
    const styles = {
        tableContainer: {
        width: '100%',
        fontFamily: 'Arial, sans-serif'
        },

        headerRow: {
        backgroundColor: 'rgba(247, 208, 138, 0.26)',
        padding: '2px',
        fontWeight: 'bold',
        width: '100%',
        fontSize: '14px'
        },
        dataRow: {
        display: 'flex',
        cursor: 'pointer',
        borderBottom: '1px solid #ccc',
        fontSize: '12px',
        },
        date: {
        width: '15%',
        padding: '2px',
        },
        creator: {
        width: '15%',
        padding: '2px',
        },
        title: {
        width: '70%',
        padding: '2px',
        }
    };

    return (
        <div style={styles.tableContainer}>
        {Object.keys(data).map((key, index) => (
            <React.Fragment key={index}>
            <div style={styles.headerRow}>{key}</div>
            {data[key].map((item) => (
                <div style={styles.dataRow} key={item.id} onClick={() => handleRowClick(item)}>
                <div style={styles.date}>{item.date}</div>
                <div style={styles.creator}>{item.creator}</div>
                <div style={styles.title}>{item.title}</div>
                </div>
            ))}
            </React.Fragment>
        ))}
        </div>
    );
};

export default Table;

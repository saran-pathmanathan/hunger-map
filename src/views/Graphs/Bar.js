const Bar = ({ data }) => {
    const total = Object.values(data).reduce((acc, val) => acc + val, 0);
  
    const getColor = (key) => {
      const colors = {
        population: '#1E90FF', // Blue
        fcs: '#32CD32', // Green
        rcsi: '#FFD700', // Yellow
        ndvi: '#FF8C00', // Orange
        rainfall: '#6A5ACD', // Slate Blue
        index : '#FF0000' // Red
      };
      return colors[key.toLowerCase()];
    };
  
    return (
      <div style={{ display: 'flex', width: '100%', height: '20px', backgroundColor: '#ccc' }}>
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            style={{
              flex: value / total * 100 + '%',
              backgroundColor: getColor(key),
              transition: 'flex 0.5s ease-out'
            }}
          />
        ))}
      </div>
    );
  };
  
  export default Bar;
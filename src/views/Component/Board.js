import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PDF from './PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useFetchPlotMutation } from '../../store';
import Bar from '../Graphs/Bar';

import mali from '../../../src/image/mali.jpeg' 

export default function Board({country, predictionData,payload, dataLoading,allDataLoaded }) {
  const [imageUrl, setImageUrl] = React.useState('');
  const [generatePdf, setGeneratePdf] = React.useState(false);
  const [fetchPlot, { data: plotData, error: plotError, isLoading: plotIsLoading }] = useFetchPlotMutation();

  React.useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?query=${country}&client_id=KfkAVWhOcEARRzTqmec03SVLy_7gbXMcbogXl_X18aE`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          setImageUrl(data.results[0].urls.small);
        }
      });
  }, [country]);

  React.useEffect(() => {
    if (allDataLoaded && generatePdf && !dataLoading) {
      const data = {
        "population": payload.population,
        "fcs": payload.fcs,
        "rcsi": payload.rcsi,
        "rainfall": payload.rainfall,
        "index": predictionData[0],
        "country": country
      }
      fetchPlot(data);
    } 
  }, [generatePdf]);

  React.useEffect(() => {
    if (plotData) {
      setGeneratePdf(true);
    }
  }, [plotData]);

  const visualizationData = {
    population: payload.population,
    fcs: payload.fcs,
    rcsi: payload.rcsi,
    ndvi: payload.ndvi,
    rainfall: payload.rainfall,
    index: predictionData && predictionData[0] != undefined ? predictionData[0] * 10000000 : 0
  };
  const colors = {
    population: '#1E90FF', // Blue
    fcs: '#32CD32', // Green
    rcsi: '#FFD700', // Yellow
    ndvi: '#FF8C00', // Orange
    rainfall: '#6A5ACD', // Slate Blue
    index : '#FF0000' // Red
  };

  const handleClick = () => {
    const data = {
      "population": payload.population,
      "fcs": payload.fcs,
      "rcsi": payload.rcsi,
      "rainfall": payload.rainfall,
      "index": predictionData[0],
      "country": country
    }
    fetchPlot(data);
  }

  return (
    <Card sx={{  }} style={{marginTop:'20px' , marginLeft:'10px', position:'absolute', left:'20%', zIndex:999, width:'25vw', height:'100%'}}>
      <CardMedia
        sx={{ height: '20%' }}
        image={imageUrl || mali}
        title={country || "Dashboard"}
      />
      <CardContent>
        <Typography mb={3} gutterBottom variant="h3" component="div">
          {country}
        </Typography>
        <Typography variant="h5" mb={1} color="text.primary">
        <div style={{backgroundColor: colors.population, borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px'}}></div>
       Population: {payload.population}
        </Typography>
        <Typography variant="h5" mb={1} color="text.primary">
        Income Group: {payload.income_group}
        </Typography>
        <Typography variant="h5" mb={1} color="text.primary">
        <div style={{backgroundColor: colors.fcs, borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px'}}></div>
        Food Consumption Score (FCS): {payload.fcs}
        </Typography>
        <Typography variant="h5" mb={1} color="text.primary">
        <div style={{backgroundColor: colors.rcsi, borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px'}}></div>
        Reduced Coping Strategy Index (RCSI): {payload.rcsi}
        </Typography>
        <Typography variant="h5" mb={1} color="text.primary">
        <div style={{backgroundColor: colors.ndvi, borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px'}}></div>
        Normalized Difference Vegetation Index (NDVI): {payload.ndvi}
        </Typography>
        <Typography variant="h5" mb={1} color="text.primary">
        <div style={{backgroundColor: colors.rainfall, borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px'}}></div>
        Vulnerable Population without Rainfall: {payload.rainfall}
        </Typography>
        {allDataLoaded ? (
          <div style={{display:'flex', alignItems:'center'}}>
          <div style={{backgroundColor: colors.index, borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px'}}></div>
          <Typography variant="h5" mb={1} color="text.primary">Predicted Malnutrition Index : {predictionData}</Typography>
          </div>
        ) : (
          <svg className="loading-circle" viewBox="0 0 10 10">
  <circle className="path" cx="5" cy="5" r="4" fill="none" strokeWidth="1"></circle>
</svg>
        )}
      </CardContent>
        <Bar data={visualizationData} />
<CardActions>
  {generatePdf && plotData ? (
    <PDFDownloadLink 
      document={<PDF country={country} data={plotData} />} 
      fileName={`${country}_Analysis_Report.pdf`}
      onContextMenu={() => setGeneratePdf(false)}
    >
      {({ blob, url, loading, error }) =>
        loading ? <Button disabled={true} size="large">Generate PDF</Button> : <Button onClick={() => setGeneratePdf(false)} size="large">Download PDF</Button>
      }
    </PDFDownloadLink>
  ) : <Button disabled={dataLoading} onClick={handleClick} size="large">Generate PDF</Button>
  }
</CardActions>
    </Card>
  );
}
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartCpn = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }


  return (
    <div className='bg-[#d4d3dcbd] p-[1%] rounded-xl mt-[3%]' style={{ height: '350px', width: '90%' }}>
            <h6 className='text-2xl font-semibold text-center text-gray-800 capitalize '>Last 6 projects</h6>
      <LineChart width={1100} height={320} data={data} margin={{ top: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="xp" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}


export default LineChartCpn;

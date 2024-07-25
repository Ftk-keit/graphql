import { CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, } from 'recharts';


const ComposetChartCpn = ({ dataG }) => {





    return (

        <div className='bg-[#d4d3dcbd] p-[1.5%] rounded-xl' style={{ height: '400px', width: '63%' }}>
            <h6 className='text-2xl font-semibold text-center text-gray-800 capitalize '>Top 6 of the best projects</h6>
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                layout="vertical"
                data={dataG}
                margin={{ top: 40, right: 20, bottom: 20, left: 100 }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" scale="band" />
                <Tooltip />
                <Legend />
                
                <Bar dataKey="xp" barSize={20} fill="#413ea0" />
                
            </ComposedChart>
        </ResponsiveContainer>
    </div>
    )
}

export default ComposetChartCpn;
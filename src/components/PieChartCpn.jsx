import React, { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Sector } from 'recharts';
import PropTypes from 'prop-types';
const PieChartCpn = ({piedata}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div  style={{ height: '100px', width: '35%' }}>
            <ResponsiveContainer className='bg-[#d4d3dcbd] p-[2%] rounded-xl' width="100%" height={400}>

            <h6 className='text-2xl font-semibold text-center text-gray-800 capitalize  mt-[5%] mb-[-10%]'>Audits ratio</h6>  
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={piedata}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#413ea0"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
PieChartCpn.propTypes = {
    piedata: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([ 
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
        })
    ).isRequired,
};



const RADIAN = Math.PI / 180;

const renderActiveShape = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload,     value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`MB ${value}`}</text>
            
        </g>
    );
};

export default PieChartCpn;

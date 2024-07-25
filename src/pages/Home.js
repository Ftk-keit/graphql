import React, { useState, useEffect } from 'react';
import { fetchData } from '../pgql/Query';
import { useNavigate } from 'react-router-dom';
import ComposetChartCpn from '../components/ComposedChartCpn';
import LineChartCpn from '../components/LineChart';
import PieChartCpn from '../components/PieChartCpn';
import { getUserRank } from '../utils/Functions';
const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [level, setLevel] = useState(0);
    const [xps, setXps] = useState(0);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [ratio, setRatio] = useState(0);
    const [login, setLogin] = useState('');
    const [tabInfoXpProjet, setTabInfoXpProjet] = useState([]);
    const [tabProgress, setTabProgress] = useState([]);
    const [piedata, setPieData] = useState(null)
    const [kbOrMb, setKbOrMb] = useState("KB")
    
    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                const result = await fetchData();
                if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
                    if (!result.data) {
                        setError('No data available');
                        localStorage.removeItem('Token');
                        navigate('/');
                    } else {
                        setData(result.data);
                    }
                } else {
                    setError('Invalid data format');
                    localStorage.removeItem('Token');
                    navigate('/');
                }
            } catch (err) {
                setError('Error fetching data');
                localStorage.removeItem('Token');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetData();
    }, [navigate]);

    useEffect(() => {
        if (data) {
            setXps((data.mesxp.aggregate.sum.amount / 1000).toFixed(0) || 0);
            if ((data.mesxp.aggregate.sum.amount / 1000) >= 1000) {
                setXps((data.mesxp.aggregate.sum.amount / 1000000).toFixed(2) || 0)
                setKbOrMb("MB")
            }
            setFirstname(data.user[0]?.firstName || '');
            setLastname(data.user[0]?.lastName || '');
            setLevel(data.user[0]?.events[0]?.level || 0);
            setEmail(data.user[0]?.email || '');
            setRatio((data.user[0]?.auditRatio || 0).toFixed(1));
            setLogin(data.user[0]?.login || '');
            const transformedData = data.xp_view.map(item => {
                const name = item.path.split('/').pop();
                return {
                    name: name,
                    xp: item.amount * 0.001
                };
            });
            setTabInfoXpProjet(transformedData);
            const transformDataLine = (data) => {
                return data.transaction_xp.reverse().map(item => {
                    const name = item.path.split('/').pop();
                    const xp = item.amount * 0.001;
                    return {
                        name: name,
                        xp: xp
                    };
                });
            };
            const dataPie = data.user.map(item => {
                const totalUp = item.totalUp
                const totalDown = item.totalDown
                return [
                    {   name : "Done",
                        value : parseFloat((totalUp / 1000000).toFixed(2))
                    }, 
                    {   name: "Received",
                        value: parseFloat((totalDown / 1000000).toFixed(2))}
                    ]
            }).flat()
            setPieData(dataPie)

            setTabProgress(transformDataLine(data));
        }
    }, [data]);
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstname}+${lastname}&rounded=true?background=d4d3dcbd`;
    const logout = () => {
        localStorage.removeItem('Token');
        navigate('/')
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
   

    return (
        <div className=' flex pl-[3%] pr-[3%]'>
            <div className=' w-[70%] '>
                <div className='ml-[-30%]'>
                    <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
                        About your projects
                    </h1>
                    <div className='flex justify-center mx-auto mt-6'>
                        <span className='inline-block w-40 h-1 bg-blue-500 rounded-full'></span>
                        <span className='inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full'></span>
                        <span className='inline-block w-1 h-1 bg-blue-500 rounded-full'></span>
                    </div>




                </div>

                <div className='flex w-[90%] mt-[2%] justify-between'>
                    <ComposetChartCpn dataG={tabInfoXpProjet} />
                    <PieChartCpn piedata={piedata}/>
                </div>
                <LineChartCpn data={tabProgress} />
            </div>
            <div className=' w-[30%]  flex flex-col items-center border-2 border-[#333] rounded-xl border-animate h-[82vh] mt-[4.5%]'>
                
                <div className="flex flex-col items-center mt-[15%] -mx-2 w-full">
                    <img
                        className="object-cover w-[8rem] bg-[#d4d3dcbd] h-[8rem] mx-2 rounded-full"
                        src={avatarUrl}
                        alt="avatar"
                    />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{firstname} {lastname}</h4>
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{getUserRank(level)}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{email}</p>
                </div>
                <div className='w-full flex flex-col'>
                    <div className='flex justify-around mt-[10%]'>
                        <div className='w-[40%] aspect-w-1 aspect-h-1 p-5 space-y-8 text-center border border-[#000] rounded-xl dark:border-gray-700 flex flex-col justify-between'>
                            <div className='flex flex-col items-center'>
                                <p className='font-medium text-gray-500 uppercase dark:text-gray-300'>Login</p>
                            </div>
                            <div className='flex justify-center'>
                                <h2 className='text-2xl font-semibold text-gray-800 uppercase dark:text-gray-100'>
                                    {login}
                                </h2>
                            </div>
                        </div>
                        <div className='w-[40%] aspect-w-1 aspect-h-1 p-5 space-y-8 text-center border border-[#000] rounded-xl dark:border-gray-700 flex flex-col justify-between'>
                            <div className='flex flex-col items-center'>
                                <p className='font-medium text-gray-500 uppercase dark:text-gray-300'>Xp</p>
                            </div>
                            <div className='flex justify-center'>
                                <h2 className='text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100'>
                                    {xps} {kbOrMb}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-around mt-[10%]'>
                        <div className='w-[40%] aspect-w-1 aspect-h-1 p-5 space-y-8 text-center border border-[#000] rounded-xl dark:border-gray-700 flex flex-col justify-between'>
                            <div className='flex flex-col items-center'>
                                <p className='font-medium text-gray-500 uppercase dark:text-gray-300'>Ratio</p>
                            </div>
                            <div className='flex justify-center'>
                                <h2 className='text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100'>
                                    {ratio}
                                </h2>
                            </div>
                        </div>
                        <div className='w-[40%] aspect-w-1 aspect-h-1 p-5 space-y-8 text-center border border-[#000] rounded-xl dark:border-gray-700 flex flex-col justify-between'>
                            <div className='flex flex-col items-center'>
                                <p className='font-medium text-gray-500 uppercase dark:text-gray-300'>level</p>
                            </div>
                            <div className='flex justify-center'>
                                <h2 className='text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100'>
                                    {level}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={logout} className='mt-[5%] w-[10rem] rounded-xl px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#413ea0] hover:bg-[#22205c] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 flex items-center justify-center'>
                    <svg
                        className='w-6 h-6' 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M13.076 97.083a1.75 1.75 0 0 0 1.75-1.75V66.667a1.75 1.75 0 0 0-3.5 0v28.666a1.75 1.75 0 0 0 1.75 1.75zM122.38 64.97c.027-.041.046-.085.069-.128a1.037 1.037 0 0 0 .146-.348c.015-.051.035-.1.045-.152a1.755 1.755 0 0 0 0-.685c-.01-.053-.03-.1-.045-.152a1.733 1.733 0 0 0-.054-.174 1.692 1.692 0 0 0-.092-.174c-.023-.042-.042-.086-.069-.127a1.75 1.75 0 0 0-.22-.269l-12.509-12.509a1.75 1.75 0 0 0-2.475 2.475l9.524 9.523H63.424a1.75 1.75 0 0 0 0 3.5H116.7l-9.523 9.523a1.75 1.75 0 1 0 2.475 2.475l12.508-12.509a1.75 1.75 0 0 0 .22-.269z"/><path d="M95.424 72.25a1.75 1.75 0 0 0-1.75 1.75v36.9H48.633V17.1h45.041V54a1.75 1.75 0 1 0 3.5 0V15.35a1.75 1.75 0 0 0-1.75-1.75H48.633V6.5a1.75 1.75 0 0 0-2.461-1.6L6.365 22.593a1.751 1.751 0 0 0-1.039 1.6v79.615a1.751 1.751 0 0 0 1.039 1.6L46.172 123.1a1.75 1.75 0 0 0 2.461-1.6v-7.1h46.791a1.75 1.75 0 0 0 1.75-1.75V74a1.75 1.75 0 0 0-1.75-1.75zm-50.291 46.558L8.826 102.67V25.33L45.133 9.192z"/></svg>}
                    </svg>
                    <span className='ml-2'>LOGOUT</span>
                </button>

            </div>
        </div>
    );
}

export default Home;

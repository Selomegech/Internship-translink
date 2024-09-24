"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SiD3Dotjs } from 'react-icons/si';

const sid = "049579ad8aa8c45f9dda8d93bd4f5d01"; 

export const TotalDistance = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [trip, setTrip] = useState<any>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://hst-api.wialon.com/wialon/ajax.html?svc=report/exec_report&params={"reportResourceId":28589852,"reportTemplateId":1,"reportObjectId":28589960,"reportObjectSecId":28589960,"reportObjectIdList":[27255747,27256656,27256879,27255796],"interval":{"from":1726638160,"to":1726724560,"flags":0}}&sid=${sid}`
                );

                setData(response.data.reportResult.tables[0].total[2]);
                setTrip(response.data.reportResult.tables[0].rows); 
            } catch (error) {
                setError(`Failed to fetch data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log(trip);
    // }, [trip]);

    return { data, error, loading, trip }; 
}



export const Linechartdata = () => {
    const [dat, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const { data: firstApiData, loading: firstApiLoading, error: firstApiError } = TotalDistance();

    useEffect(() => {
        const fetchData = async () => {
            // Only proceed if the first API call has completed successfully
            if (!firstApiLoading && !firstApiError && firstApiData) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `https://hst-api.wialon.com/wialon/ajax.html?svc=report/get_result_rows&params={"tableIndex":0,"indexFrom":0,"indexTo":200}&sid=${sid}`
                    , { timeout: 10000 });
                    setData(response.data);
                    // console.log("now:" ,response.data);

                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.error('Axios error:', error.response?.data);
                    }
                    setError(`Failed to fetch data: ${error}`);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [firstApiData, firstApiLoading, firstApiError]); // Dependency array includes the first API's data and loading state

    // useEffect(() => {
    //     console.log(dat);
    // }, [dat]);

    return {dat, error, loading};
}

export const Speedometer = () => {
    const [da, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { data: firstApiData, loading: firstApiLoading, error: firstApiError } = TotalDistance();
    
    
    useEffect(() => {
        const fetchData = async () => {
            // Only proceed if the first API call has completed successfully
            if (!firstApiLoading && !firstApiError && firstApiData) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `https://hst-api.wialon.com/wialon/ajax.html?svc=report/exec_report&params={"reportResourceId":28589852,"reportTemplateId":2,"reportObjectId":28589960,"reportObjectSecId":28589960,"reportObjectIdList":[27255747,27256656,27256879,27255796],"interval":{"from":1726638160,"to":1726724560,"flags":0}}&sid=${sid}`
                    ,{ timeout: 10000 });
                    setData(response.data.reportResult.tables[0].total[2]);

                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.error('Axios error:', error.response?.data);
                    }
                    setError(`Failed to fetch data: ${error}`);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [firstApiData, firstApiLoading, firstApiError]); 

    useEffect(() => {
        console.log(da);
    }, [da]);

    return {da, error, loading};
}

export const SpeedAndDistance = () => {
    const [distance, setDistance] = useState<number | null>(null);
    const [speed, setSpeed] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch speed and distance based on vehicle ID
    const fetchSpeedAndDistance = async (vehicleId: string) => {
        setLoading(true);
        setError(null); // Reset error state

        try {
             
            const responseDistance = await axios.get(
                `https://hst-api.wialon.com/wialon/ajax.html?svc=report/exec_report&params={"reportResourceId":28589852,"reportTemplateId":1,"reportObjectId":${vehicleId},"reportObjectSecId":0,"interval":{"from":1726638160,"to":1726724560,"flags":0}}&sid=${sid}`,
                { timeout: 10000 }
            );
            setDistance(responseDistance.data.reportResult.tables[0].total[2]);

            const responseSpeed = await axios.get(
                `https://hst-api.wialon.com/wialon/ajax.html?svc=report/exec_report&params={"reportResourceId":28589852,"reportTemplateId":2,"reportObjectId":${vehicleId},"reportObjectSecId":0,"interval":{"from":1726638160,"to":1726724560,"flags":0}}&sid=${sid}`,
                { timeout: 10000 }
            );
            setSpeed(responseSpeed.data.reportResult.tables[0].total[2]);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            }
            setError(`Failed to fetch data: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return { fetchSpeedAndDistance, distance, speed, error, loading };
};


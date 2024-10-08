import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useSearch } from '../../Context/SearchContext';
import usImage from '../../../assets/Regions/us.png';
import euImage from '../../../assets/Regions/eu.png';
import { updateURL } from '~/utils/helper/updateURL';

const RegionSearch = ({partofLeadeboard} : {partofLeadeboard: boolean}) => {
    const { setCurrentPage } = useSearch();
    const [region, setRegion] = useState('');

    // Initialize state based on URL parameter
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const initialRegion = urlParams.get('region') ?? 'us';
        setRegion(initialRegion);
    }, []);

    const handleClick = (newRegion: string) => {
        if (newRegion === region) return;
        setRegion(newRegion);
    }

    useEffect(() => {
        if (region) {
            updateURL('region', region === 'us' ? '' : region, true);
            setCurrentPage(1);
        }
    }, [region]);

    return (
        <div className={`flex text-black items-center justify-center ${partofLeadeboard ? 'w-1/5 border-[1px] border-secondary-gray border-opacity-30' : 'w-[400px]'} rounded-lg gap-8  `}>
            <div
                className={`cursor-pointer rounded-full w-12 h-12 items-center justify-center ${region === 'us' ? 'border-2  border-secondary-gray' : ''}`}
                onClick={() => handleClick('us')}
            >
                <Image
                    className='rounded-full'
                    src={usImage}
                    alt='region'
                    width={48}
                    height={48}
                />
            </div>
            <div
                className={`cursor-pointer rounded-full w-12 h-12 flex items-center justify-center ${region === 'eu' ? 'border-2 border-secondary-gray' : ''}`}
                onClick={() => handleClick('eu')}
            >
                <Image
                    className='rounded-full'
                    src={euImage}
                    alt='region'
                    width={48}
                    height={48}
                />
            </div>
        </div>
    )
}

export default RegionSearch;

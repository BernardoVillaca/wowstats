import React from 'react'
import Image from 'next/image';
import { useSearch } from '../../Context/SearchContext';
import hordeIcon from '../../../assets/WowFactions/horde.png';
import allyIcon from '../../../assets/WowFactions/alliance.png';

const RegionSearch = () => {
    const { faction, setFaction } = useSearch();

    const handleToggle = (newFaction: string) => {
        if (faction === newFaction) {
            setFaction('');
        } else {
            setFaction(newFaction);
        }
    }
   

    return (
        <div className='flex text-black items-center justify-center w-1/5 rounded-lg gap-8 border-[1px] border-gray-700'>
            <div
                className={`cursor-pointer rounded-full w-12 h-12 flex items-center justify-center ${faction === 'horde' ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleToggle('horde')}
            >
                <Image
                    className='rounded-full'
                    src={hordeIcon}
                    alt='faction'
                    width={25}
                    height={25}
                />
            </div>
            <div
                className={`cursor-pointer rounded-full w-12 h-12 flex items-center justify-center ${faction === 'alliance' ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleToggle('alliance')}
            >
                <Image
                    className='rounded-full'
                    src={allyIcon}
                    alt='faction'
                    width={30}
                    height={30}
                />
            </div>
        </div>
    );
}

export default RegionSearch;
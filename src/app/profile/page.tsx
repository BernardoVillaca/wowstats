'use client'
import us from '../../assets/Regions/us.png';
import eu from '../../assets/Regions/eu.png';
import { useEffect, useState } from "react";
import useURLChange from "~/utils/hooks/useURLChange";
import Image from 'next/image';
import axios from 'axios';
import ActitivityTab from './Components/ActivityTab';
import TittlesTab from './Components/TittlesTab';
import { FiLoader } from 'react-icons/fi';
import { classColors } from '~/utils/helper/classIconsMap';
import { capitalizeFirstLetter } from '~/utils/helper/capitalizeFirstLetter';
import BracketButton from './Components/BracketButton';
import RetailTalentsTab from './Components/RetailTalentsTab';
import ClassicTalentsTab from './Components/ClassicTalentsTab';


type QueryParams = {
    version: string | null;
    region: string | null;
    name: string | null;
    realm: string | null;
    class: string | null;
    spec: string | null;
    bracket?: string | null;
};

type BracketStatistics = {
    rating: number;
    season_match_statistics: {
        played: number;
        won: number;
        lost: number;
    };
    weekly_match_statistics: {
        played: number;
        won: number;
        lost: number;
    };
};

type ProfileData = Record<string, BracketStatistics>;


const ProfilePage = () => {
    const [params, setParams] = useState<QueryParams>({} as QueryParams);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [choosenBracket, setChoosenBracket] = useState<string>('3v3');
    const queryParams = useURLChange();
    const [bracketLoading, setBracketLoading] = useState(true);


    useEffect(() => {
        const params = getQueryParams();
        setParams(params);
        const getBracketData = async () => {
            setBracketLoading(true);
            if (params.version ?? params.region ?? params.name ?? params.realm) {
                const response = await axios.get('/api/getBracketData', { params })
                setProfileData(response.data as ProfileData);
            }
            setBracketLoading(false);

        }
        void getBracketData();
    }, [queryParams]);


    const getQueryParams = () => {
        const params = new URLSearchParams(queryParams ?? '');
        return {
            version: params.get('version'),
            region: params.get('region'),
            name: params.get('name'),
            realm: params.get('realm'),
            class: params.get('class'),
            spec: params.get('spec')
        };
    };


    return (
        <main className="flex flex-col min-h-screen  text-white relative gap-4 py-2">
            <div className="flex h-16 bg-secondary-light_black items-center place-content-center gap-2 rounded-lg">
                <a
                    href={`https://worldofwarcraft.blizzard.com/en-us/character/${params.region}/${params.realm?.toLowerCase()}/${params.name?.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex gap-2'
                    style={{ color: params.class ? classColors[capitalizeFirstLetter(params.class)] : undefined }}
                >
                    <span>{capitalizeFirstLetter(params.name ?? '')}</span>
                    <span>-</span>
                    <span>{capitalizeFirstLetter(params.realm ?? '')}</span>
                </a>
                {params.region === 'us' && <Image src={us} width={25} alt="us" />}
                {params.region === 'eu' && <Image src={eu} width={25} alt="eu" />}
            </div>
            <div className="flex gap-2 h-32 w-full">
                {bracketLoading ? (
                    <div className="h-full flex flex-col place-content-center items-center bg-secondary-light_black w-full">
                        <FiLoader className="animate-spin text-white" size={50} />
                    </div>
                ) : (
                    <div className='flex w-full justify-center gap-2'>
                        {profileData && Object.entries(profileData).map(([bracket, data]) => (
                            <BracketButton
                                key={bracket}
                                params={params}
                                bracket={bracket}
                                data={data}
                                setChoosenBracket={setChoosenBracket}
                                choosenBracket={choosenBracket}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className='flex gap-2'>
                <div className='flex flex-col w-1/2 gap-2'>
                    <ActitivityTab choosenBracket={choosenBracket} params={params} />
                    <TittlesTab params={params} />
                </div>
                <div className='flex flex-col w-1/2 gap-2'>
                    {params.version === 'retail' ?
                        <RetailTalentsTab params={params} />
                        : <ClassicTalentsTab params={params} />

                    }
                </div>

            </div>
        </main >
    )
}

export default ProfilePage;

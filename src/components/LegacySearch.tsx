import React, { useEffect, useState } from 'react';
import { updateURL } from '~/utils/helper/updateURL';
import { useSearch } from './Context/SearchContext';

const legacyExpMap = {
  'Battle for Azeroth': {
    '2': 27,
    '3': 28,
    '4': 29,
  },
  'Shadowlands': {
    '1': 30,
    '2': 31,
    '3': 32,
    '4': 33,
  },
  'Dragonflight': {
    '1': 34,
    '2': 35,
    '3': 36,
    '4': 37,
  }
};

interface SeasonState {
  expansion: string;
  season: string;
  pvpSeasonIndex: number;
}

const LegacySearch = () => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonState>({ expansion: 'Dragonflight', season: '4', pvpSeasonIndex: 37 });
  const { setCurrentPage } = useSearch();

  useEffect(() => {
    if (selectedSeason.expansion !== 'Dragonflight' || selectedSeason.season !== '4') {
      updateURL('pvpSeasonIndex', selectedSeason.pvpSeasonIndex.toString(), true);
    } else {
      updateURL('pvpSeasonIndex', '', true);
    }
    setCurrentPage(1);
  }, [selectedSeason, setCurrentPage]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialSeasonIndex = urlParams.get('pvpSeasonIndex') ?? '37';
    const initialSeason = findSeasonByIndex(parseInt(initialSeasonIndex, 10));

    setSelectedSeason(initialSeason);
  }, []);

  const findSeasonByIndex = (index: number): SeasonState => {
    for (const [expansion, seasons] of Object.entries(legacyExpMap)) {
      for (const [season, pvpSeasonIndex] of Object.entries(seasons)) {
        if (pvpSeasonIndex === index) {
          return { expansion, season, pvpSeasonIndex };
        }
      }
    }
    return { expansion: 'Dragonflight', season: '4', pvpSeasonIndex: 37 };
  };

  const onClickHandler = (expansion: string, season: string, pvpSeasonIndex: number) => {
    if (selectedSeason.expansion === expansion && selectedSeason.season === season && selectedSeason.pvpSeasonIndex === pvpSeasonIndex) return;
    setSelectedSeason({ expansion, season, pvpSeasonIndex });
  }

  const isSelected = (expansion: string, season: string, pvpSeasonIndex: number) => {
    return selectedSeason.expansion === expansion && selectedSeason.season === season && selectedSeason.pvpSeasonIndex === pvpSeasonIndex;
  }

  return (
    <div className='flex h-16 gap-12 justify-center'>
      {Object.entries(legacyExpMap).map(([expansion, seasons]) => (
        <div key={expansion} className='flex border-[1px] bg-secondary-light_black border-secondary-gray border-opacity-30 px-2 gap-4 rounded-xl items-center'>
          <h2 className='text-white'>{expansion}</h2>
          <div className='flex gap-4'>
            {Object.entries(seasons).map(([season, pvpSeasonIndex]) => (
              <button
                onClick={() => onClickHandler(expansion, season, pvpSeasonIndex)}
                key={season}
                className={`h-6 w-6 rounded-full ${isSelected(expansion, season, pvpSeasonIndex) ? ' bg-secondary-navy border-[1px] border-gray-700' : ' bg-secondary-gray text-black'}`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegacySearch;

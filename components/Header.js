import React, {useState} from 'react'
import Image from "next/image"
import {GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon} from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range';
import {useRouter} from 'next/dist/client/router';


const Header = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOFGuests] = useState(1);
    const router = useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests
            }
        });
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/* logo */}
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                    onClick={() => router.push("/")}
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                    type="text"
                    placeholder="Start your search"
                />
                <SearchIcon
                    className="hidden md:inline-flex h-8 text-white bg-red-400 rounded-full cursor-pointer p-2 md:mx-2"/>
            </div>
            <div className="flex space-x-4 items-center justify-end text-gray-400">
                <p className="hidden md:inline">Become a host</p>
                <GlobeAltIcon className="h-6"/>
                <div className="flex items-center space-x-2 border-2 rounded-full p-2">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-2">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UsersIcon className="h-5"/>
                        <input
                            type="number"
                            className="w-12 pl-2 text-lg outline-none text-red-400"
                            value={noOfGuests}
                            min={1}
                            onChange={(e) => setNoOFGuests(e.target.value)}
                            placeholder={props.placeholder || 'Start your Search'}
                        />
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={search} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header

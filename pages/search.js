import {useRouter} from 'next/dist/client/router';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {format} from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

const Search = ({searchResults}) => {
    const router = useRouter();
    const {location, startDate, endDate, noOfGuests} = router.query;
    const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formatedStartDate} - ${formatedEndDate}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {noOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold">Stayes in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 test-gray-800 whitespace-nowrap pt-4">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>
                    <div className="flex flex-col">
                        {searchResults.map(item => (
                            <InfoCard
                                key={item.img}
                                img={item.img}
                                location={item.location}
                                star={item.star}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                total={item.total}
                            />
                        ))}
                    </div>
                </section>
                <section className="xl:inline-flex min-w-[600px]">
                    <Map searchResults={searchResults}/>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz').then(res => res.json());

    return {
        props: {
            searchResults,
        }
    }
}

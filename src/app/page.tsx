import { cookies } from 'next/headers';
import Results from '../components/Results/Results.tsx';

async function getData(req: string, page: number) {
  const res = await fetch(`https://swapi.dev/api/people/?search=${req || ''}&page=${page || '1'}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getDetails(details: string) {
  const res = await fetch(`https://swapi.dev/api/people/${details}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string; page: number; details: string };
}) {
  const data = await getData(searchParams.search, Number(searchParams.page));

  const details = await getDetails(searchParams.details);

  const searchCookie = cookies().get('search');
  const themeCookie = cookies().get('theme');

  return <Results data={data} details={details} search={searchCookie} theme={themeCookie} />;
}

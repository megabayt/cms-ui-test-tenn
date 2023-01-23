import { Layout } from './Layout';

export const Contentful = () => {
  return (
    <Layout 
      banner1Src="https://picsum.photos/800/600?q=1"
      banner2Src="https://picsum.photos/800/600?q=2"
      matchOfTheDay={{
        title: 'Лацио — Милан',
        time: 'Сегодня в 22:45',
      }}
      favouriteChampionship="Australian open"
    />
  );
}

import PokemonImage from '@/components/pokemon/pokemonImage';
import PokemonTag from '@/components/pokemon/pokemonTypeTag';
import { Pokemon, PokemonFetch, PokemonSpeciesFetch } from '@/models/pokemon';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

const PokemonPage: React.FC<{
  pokemon: Pokemon;
}> = ({ pokemon }) => {
  return (
    <>
      <Head>
        <title>PokéDex - {pokemon.name}</title>
      </Head>
      <div className="padding-x w-full">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          {/* pokemon image */}
          <PokemonImage
            name={pokemon.name}
            id={pokemon.id}
            color={pokemon.color.name}
          />

          {/* pokemon details */}
          <div className="w-full">
            <div className="dark:border-white mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold">
              <i className="text-slate-500">#{pokemon.id}</i>
              {pokemon.name}
              <div className="flex gap-1">
                {pokemon.types.map((type) => (
                  // <PokemonTag type={type.type.name}/>
                  <PokemonTag key={type.type.name} type={type.type.name} />
                ))}
              </div>
            </div>
            <div>
              <table className="w-full border-none">
                <tbody>
                  <tr>
                    <td>height:</td>
                    <td>{pokemon.height / 10}m</td>
                  </tr>
                  <tr>
                    <td>weight:</td>
                    <td>{pokemon.weight / 10}kg</td>
                  </tr>
                  <tr>
                    <td>base experience:</td>
                    <td>{pokemon.base_experience}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-2xl">Stats</h2>
          <table className="w-full border-separate text-center">
            <thead>
              <tr>
                <td className="dark:border-sky-300 dark:bg-sky-800 rounded-md border-2 border-sky-800 bg-sky-300">
                  name
                </td>
                <td className="dark:border-sky-300 dark:bg-sky-800 rounded-md border-2 border-sky-800 bg-sky-300">
                  base stat
                </td>
                <td className="dark:border-sky-300 dark:bg-sky-800 rounded-md border-2 border-sky-800 bg-sky-300">
                  effort
                </td>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((stat) => (
                <tr key={stat.stat.name}>
                  <td className="dark:border-slate-700 rounded-md border-2 border-sky-500">
                    {stat.stat.name}
                  </td>
                  <td className="dark:border-slate-700 rounded-md border-2 border-sky-500">
                    {stat.base_stat}
                  </td>
                  <td className="dark:border-slate-700 rounded-md border-2 border-sky-500">
                    {stat.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.pokemonName || undefined;
    const pokemonResponse = await axios<PokemonFetch>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon = pokemonResponse.data;

    const speciesResponse = await axios<PokemonSpeciesFetch>(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`
    );
    const species = speciesResponse.data;
    // const evolutionurl = speciesResponse.data.evolution_chain.url;

    return {
      props: {
        pokemon: {
          id: pokemon.id,
          name: pokemon.name,
          base_experience: pokemon.base_experience,
          height: pokemon.height,
          weight: pokemon.weight,
          stats: pokemon.stats,
          types: pokemon.types,

          color: species.color,
          varieties: species.varieties,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
